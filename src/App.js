import "./App.css";
import React, { useEffect, useState } from "react";
import Quagga from "quagga";

function getMedian(arr) {
  const newArr = [...arr]; // copy the array before sorting, otherwise it mutates the array passed in, which is generally undesireable
  newArr.sort((a, b) => a - b);
  const half = Math.floor(newArr.length / 2);
  if (newArr.length % 2 === 1) {
    return newArr[half];
  }
  return (newArr[half - 1] + newArr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
  const errors = decodedCodes.flatMap((x) => x.error);
  const medianOfErrors = getMedian(errors);
  return medianOfErrors;
}

function App() {
  // eslint-disable-next-line no-unused-vars
  function test() {
    Quagga.decodeSingle(
      {
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
            "2of5_reader",
            "code_93_reader",
          ],
        },
        locate: true, // try to locate the barcode in the image
        src: "data:image/png;base64,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",
      },
      function (result) {
        if (result?.codeResult) {
          console.log("result", result.codeResult.code);
          alert(result.codeResult.code);
        } else {
          console.log("not detected");
          alert("not detected");
        }
      }
    );
  }

  const [barcode, setBarcode] = useState();

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#yourElement"), // Or '#yourElement' (optional)
        },
        decoder: {
          readers: [
            // "code_128_reader",
            "ean_reader",
            // "ean_8_reader",
            // "code_39_reader",
            // "code_39_vin_reader",
            // "codabar_reader",
            "upc_reader",
            // "upc_e_reader",
            // "i2of5_reader",
            // "2of5_reader",
            // "code_93_reader",
          ],
          locate: true,
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        alert("Initialization finished. Ready to start");
        Quagga.start();
        Quagga.onDetected((data) => {

          if (data) {
            console.log(data);
          }
          if (data?.codeResult?.code) {
            const err = getMedianOfCodeErrors(data.codeResult.decodedCodes);
            const code = data.codeResult.code;
            const acceptable = err < 0.094;
            if (acceptable) {
              setBarcode(data.codeResult.code);
            }
          }
        });
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{barcode ?? "Not detected"}</h1>
        <p id="yourElement"></p>
      </header>
    </div>
  );
}

export default App;
