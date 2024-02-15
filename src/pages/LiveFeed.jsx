import { useRef, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
//roboflow cred
const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_t1Ap7HRSGSeZRzIVfP09vvtV3i13";
const PROJECT_URL = "weed-detection-ycai2";
const MODEL_VERSION = "1";

const GarbagePickupDemo = (props) => {
  const [enableCamText, setEnableCamText] = useState(
    "Enable camera",
  );
  const [disableCamButton, setDisableCamButton] = useState(false);
  const [disableStopButton, setDisableStopButton] = useState(true);

  const canvasRef = useRef(null);
  const streamSourceRef = useRef(null);
  var videoWidth = 800;
  var videoHeight = 460;

  var model = undefined;
  var detectInterval = useRef(null);

  const emptyTolerance = 30;
  var emptyingTrash = false;

  useEffect(() => {
    loadModel();
  }, []);

  // useEffect(() => {
  //   loadingAnimations();
  // }, []);

  // // show loading animations at startup
  // const loadingAnimations = () => {
  //   setDisableCamButton(true);
  //   setModelStatusCss("model-status-loading");
  //   setModelStatus("Object Detection Loading");
  //   setTimeout(() => {
  //     setModelStatusCss("removed");
  //     setDisableCamButton(false);
  //   }, 2000);
  // };

  const showWebCam = async () => {
    setDisableCamButton(true);
    const camPermissions = await enableCam(true);
    if (camPermissions) {
      if (enableCamText === "Restart Camera and Detection") {
        restartCamDetection();
      }

      await loadModel();

      await enableCam();
      setDisableStopButton(false);
      startDetection();
    }
  };

  const restartCamDetection = () => {
    emptyingTrash = false;
  };

  //load the model
  const loadModel = async () => {
    await window.roboflow
      .auth({
        publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY,
      })
      .load({
        model: PROJECT_URL,
        version: MODEL_VERSION,
        onMetadata: function (m) { },
      })
      .then((ml) => {
        model = ml;
      });
  };

  //Start detecting
  const startDetection = () => {
    if (model) {
      detectInterval.current = setInterval(() => {
        detect(model);
      }, 1000);
    }
  };

  //Stop detection
  const stopDetection = async () => {
    clearInterval(detectInterval.current);

    //clear canvas when stop detecting
    setTimeout(() => {
      clearCanvas();
    }, 500);
  };


  const clearCanvas = () => {
    canvasRef.current.getContext("2d").clearRect(0, 0, 360, 360);
  };

  //Enable live webcam
  const enableCam = (checkCamPermission = false) => {
    const constraints = {
      video: {
        width: videoWidth, //416
        height: videoHeight, //416
        facingMode: "environment",
      },
    };

    return navigator.mediaDevices.getUserMedia(constraints).then(
      function (stream) {
        if (checkCamPermission) {
          stream.getVideoTracks().forEach((track) => {
            track.stop();
          });
          return true;
        } else {
          streamSourceRef.current.srcObject = stream;
          streamSourceRef.current.addEventListener("loadeddata", function () {
            return true;
          });
        }
      },
      (error) => {
        setDisableCamButton(true);
        setDisableStopButton(true);
        checkCamPermission && alert("You have to allow camera permissions");
        setEnableCamText("Allow your camera permissions and reload");
        return false;
      },
    );
  };




  const stopCamera = (options) => {
    if (
      streamSourceRef.current != null &&
      streamSourceRef.current.srcObject !== null
    ) {
      streamSourceRef.current.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    }
    stopDetection();
    setEnableCamText("Restart Camera and Detection");
    // setTrashCanCss("trash-icon");
    if (options !== "fromDetect") {
    }
    setDisableCamButton(false);
    setDisableStopButton(true);
  };

  const restartDetection = (intervalTimer) => {
    clearInterval(detectInterval.current);
    detectInterval.current = undefined;
    if (model) {
      detectInterval.current = setInterval(() => {
        detect(model);
      }, intervalTimer);
    }
  };

  let trashToleranceTicker = 0;
  let trashToleranceTimer = undefined;
  const emptyTrashTolerance = (start) => {
    if (!start) {
      clearInterval(trashToleranceTimer);
    } else {
      trashToleranceTimer = setInterval(() => {
        trashToleranceTicker++;
      }, 1000);
    }
    return trashToleranceTicker;
  };

  //Detection stuff
  const detect = async (model) => {
    console.log("detect");
    if (
      typeof streamSourceRef.current !== "undefined" &&
      streamSourceRef.current !== null
    ) {
      adjustCanvas(videoWidth, videoHeight);

      const detections = await model.detect(streamSourceRef.current);

      let truckPresent = false;

      if (detections.length > 0) {
        detections.forEach((el) => {
          if (el.class === "garbageTruck" && el.confidence > 0.6) {
            truckPresent = true;
          }

          if (
            truckPresent &&
            el.class === "garbagePickingUp" &&
            el.confidence > 0.6
          ) {
            emptyingTrash = true;
            emptyTrashTolerance(true);
            // setTrashCanCss("trash-icon trash-icon-empty");
            // setGarbageStatus("Emptying trash can!");
          }
        });
      }

      if (truckPresent) {
        restartDetection(10);
      } else {
        restartDetection(1000);
      }

      if (
        emptyingTrash &&
        !truckPresent &&
        trashToleranceTicker > emptyTolerance
      ) {
        emptyingTrash = false;
        emptyTrashTolerance(false);
        // setTrashCanCss("trash-icon");
        // setGarbageStatus("Emptied Trash Can!");
        stopCamera("fromDetect");
      }

      const ctx = canvasRef.current.getContext("2d");
      drawBoxes(detections, ctx);
    }
  };

  const adjustCanvas = (w, h) => {
    canvasRef.current.width = w * window.devicePixelRatio;
    canvasRef.current.height = h * window.devicePixelRatio;

    canvasRef.current.style.width = w + "px";
    canvasRef.current.style.height = h + "px";

    canvasRef.current
      .getContext("2d")
      .scale(window.devicePixelRatio, window.devicePixelRatio);
  };

  const drawBoxes = (detections, ctx) => {
    detections.forEach((row) => {
      if (true) {
        //video
        var temp = row.bbox;
        temp.class =
          row.class === 1
            ? "weed"
            : row.class === 0
              ? "crop"
              : row.class;
        temp.color = row.color;
        temp.confidence = row.confidence;
        row = temp;
      }
      if (row.confidence < 0) return;

      //dimensions
      var x = row.x - row.width / 2;
      var y = row.y - row.height / 2;
      var w = row.width;
      var h = row.height;

      //box
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = row.color;
      ctx.rect(x, y, w, h);
      ctx.stroke();

      //shade
      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.2;
      ctx.fillRect(x, y, w, h);
      ctx.globalAlpha = 1.0;

      //label
      var fontColor = "black";
      var fontSize = 12;
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";
      var classTxt = row.class;

      var confTxt = "weed detected : " + (row.confidence * 100).toFixed().toString() + "% ";
      var msgTxt = classTxt + " " + confTxt;

      const textHeight = fontSize;
      var textWidth = ctx.measureText(msgTxt).width;

      if (textHeight <= h && textWidth <= w) {
        ctx.strokeStyle = row.color;
        ctx.fillStyle = row.color;
        ctx.fillRect(
          x - ctx.lineWidth / 2,
          y - textHeight - ctx.lineWidth,
          textWidth + 2,
          textHeight + 1,
        );
        ctx.stroke();
        ctx.fillStyle = fontColor;
        ctx.fillText(msgTxt, x + textWidth / 2 + 1, y - 1);
      } else {
        textWidth = ctx.measureText(confTxt).width;
        ctx.strokeStyle = row.color;
        ctx.fillStyle = row.color;
        ctx.fillRect(
          x - ctx.lineWidth / 2,
          y - textHeight - ctx.lineWidth,
          textWidth + 2,
          textHeight + 1,
        );
        ctx.stroke();
        ctx.fillStyle = fontColor;
        ctx.fillText(confTxt, x + textWidth / 2 + 1, y - 1);
      }
    });
  };


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col px-16 w-[80%] mt-16">
        <div className="mb-4">
            <h1 className="outfit-600 text-[28px] mb-2">Live Feed</h1>
            <p className="outfit-300">Real time detections are shown below...</p>
        </div>
        <div className="flex gap-6  mb-10">
          <button
            onClick={showWebCam}
            disabled={disableCamButton}
            className={`outfit-500 bg-black py-2 px-4 text-white rounded-full`}
          >
            {enableCamText}
          </button>
          <button
            className="rounded-full py-2 px-4 flex justify-center items-center outfit-500 bg-black text-white hover:cursor-pointer"
            onClick={stopCamera}
            disabled={disableStopButton}
          >
            <span>Stop Cam</span>
          </button>
        </div>
        <div className="border-black border-2 h-[461px] w-[800px] mx-auto">
          <canvas ref={canvasRef} className="absolute z-[20]" />
          <video
            ref={streamSourceRef}
            autoPlay
            muted
            playsInline
            width={videoWidth}
            height={videoHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default GarbagePickupDemo;
