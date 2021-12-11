import React, { useState, useCallback, useRef } from "react";

import Popup from "reactjs-popup";
import produce from "immer";
import "./App.css";
import gif from "./assets/conway.gif";

// represents the neighbors position relative to any grid.
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function App() {
  // State:
  const [gridstate, setgridState] = useState([]);
  const [rowCols, setRowCols] = useState({ rows: 0, cols: 0 });
  const [running, setRunning] = useState(false);
  const [genNum, setGenNum] = useState(0);
  const [position, setPosition] = useState("absolute");
  const [btnClick, setBtnClick] = useState({
    btn1: "random",
    btn2: "generate",
  });
  const [gridColors, setGridColors] = useState({
    deadCell: "",
    liveCell: "",
  });
  const [speed, setSpeed] = useState({
    speed: "",
  });

  const handleChange = (e) => {
    // prevents reload of page on btn click
    e.preventDefault();
    // set the row columns state to initialize the grid based on row length and width provided on the client
    setRowCols({ ...rowCols, [e.target.name]: e.target.value });
    // console.log("ROW:", rowCols);
  };

  // Set Coulumn height takes in num represents the column height, rowNums represents the number
  // of items in the row. Btn click sets the footer depending on whether or not the grid is initialized
  // or not.
  const setColumnHeight = (num, rowNum, btnClick, e) => {
    // console.log("RAN", num);
    // setgridState([]);
    let newArray = [];
    let empty = [];
    for (let i = 1; i <= num; i++) {
      newArray.push(empty);
    }
    // callback to set the number of items in the row
    setRowWidth(newArray, rowNum, btnClick);
  };

  const setRowWidth = (arr, num, btnClick, e) => {
    // console.log("RAN", num);
    let initialState = 0;
    let index = 0;
    // console.log(btnClick);
    if (btnClick === "generate") {
      while (index <= gridstate.length) {
        for (let i = 1; i <= num; i++) {
          arr[index].push(initialState);
          index++;
        }
        setgridState(arr);
      }
    } else {
      if (btnClick === "random") {
        while (index < gridstate.length) {
          for (let i = 0; i <= num; i++) {
            let oneOrZero = () => {
              return Math.random() > 0.7 ? 1 : 0;
            };
            // console.log(
            //   `Added random int to position ${i}, into array at index ${index}`
            // );
            arr[index].splice(i, 1, oneOrZero());
          }
          // console.log(index);
          if (index <= gridstate.length - 1) {
            console.log("incremented", index + 1);
            index++;
          }
        }
        // console.log(`Set gridstate to ${arr}`);
        setgridState(arr);
      }
    }
  };

  const handleSpeed = (e) => {
    /// sets the speed according to choice provided by the client
    setSpeed({ ...speed, [e.target.name]: e.target.value });
  };

  const handleColors = (e) => {
    // e.preventDefault();
    // sets the color accoridn to choice provided by the client.
    const newColor = {
      ...gridColors,
      [e.target.name]: e.target.value,
    };
    setGridColors(newColor);
  };

  // allows enter click to manage client request
  const handleSubmit = (e) => {
    e.preventDefault();
    setColumnHeight(
      parseInt(rowCols.cols),
      parseInt(rowCols.rows),
      btnClick.btn2
    );
    handlePosition();
  };

  const handleRandom = (e) => {
    e.preventDefault();
    setColumnHeight(
      parseInt(rowCols.cols),
      parseInt(rowCols.rows),
      btnClick.btn1
    );
    handlePosition();
  };

  const resetGame = (e) => {
    // prevents page reload on button click
    e.preventDefault();
    setgridState([]);
    setGenNum(0);
    handlePosition();
  };

  const handlePosition = () => {
    position === "absolute" ? setPosition("relative") : setPosition("absolute");
  };
  // REFERENCES (set to be used inside of the runSimulation function since
  // getting the value of the updates inside of a recursive call is not possible otherwise)
  const runningRef = useRef();
  runningRef.current = running;

  const gridStateRef = useRef();
  gridStateRef.current = gridstate;

  const genRef = useRef(genNum);

  const speedRef = useRef();
  speedRef.current = speed.speed;

  const runSimulation = useCallback(() => {
    // run simulation is a recursive function which handles the animation of the
    // simulation.

    // Base case is the running state is set to false "stop button click" the simulation returns
    // ending the simulation
    if (!runningRef.current) {
      return;
    }

    // set grid takes parameter g which represents the current state.
    setgridState((g) => {
      // it returns the next version of state, drafts the following state according to
      // the paramaters set in the algorithm, then turns that copy of state as the
      // current state and then this continues as the recursive function continues
      // to call it's self.
      return produce(g, (gridCopy) => {
        // for loop runs from 0 to the length of of the items in a row.
        for (let i = 0; i < rowCols.rows; i++) {
          // for loop runs from the start of the initial nested array that represent a column
          // to the last nested array aka column in the nested array.
          for (let j = 0; j < rowCols.cols; j++) {
            // neighbors is instantiated to represent the number of neighbors surrounding a singular grid
            let neighbors = 0;
            // operations represents the position of each neighbor surrounding any grid. The operations
            // represents the 8 corrosponding neighbors position relative to the current grid.
            // The current grid can be represented by variables i and j above.
            // gridstate[j][i] represents a value at a x,y axis point on the grid using a 2d array.
            operations.forEach(([x, y]) => {
              // newI & NewJ represent the position of each neighbor relative to the position of the current
              // grid. taking x, y and adding it to NewI & NewJ allows you to get the position of each neighbor
              // surrounding every grid. We store the values in a variable to use in our conditional reasoning.
              const newI = i + x;
              const newJ = j + y;
              // Sets the bounds of how to handle the edges of our 2d array. Checks if the values are with
              // in range of the 2d array and if it is then read the next line...
              if (
                newI >= 0 &&
                newI < rowCols.rows &&
                newJ >= 0 &&
                newJ < rowCols.cols
              ) {
                // the value of neighbors is equal to the number of neighbors whose value is 1
                // surrounding each grid. We achieve this by incrementing neighbors from 0
                // to +1 or + 0 for every value surrounding each singular grid.
                neighbors += g[newI][newJ];
              }
            });
            // sets the rules of the game.
            // if neighbors is less than 2 or greater than 3 then those cells die by being
            // set to 0.
            if (neighbors < 2 || neighbors > 3) {
              // sets grids that meet criteria to 0
              gridCopy[i][j] = 0;
              // else if the value is 0 and there are 3 surrounding neighbors this cell
              // becomes alive by it's value being set to 1
            } else if (g[i][j] === 0 && neighbors === 3) {
              // value that meet this criteria are set to a value of 1
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    // when the recursive call finishes each round the generation value increments by 1.
    genRef.current++;
    // console.log("IN ALGO:", speedRef.current);
    // setTimeout runs the simulation in intervals set by the client normal === 1000 which is equal to 1 time each second.
    // can be set to 2, 4, 8, 10, or 20 times faster than a second.
    setTimeout(runSimulation, parseInt(speedRef.current));
    // dependencies required.
  }, [rowCols.cols, rowCols.rows]);

  console.log("SPEED CHANGE:", parseInt(speed.speed));

  return (
    <>
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <section className="setUp">
          <div className="set">
            <h3>Simulation Set Up:</h3>
            <p>
              1. Choose a column size, row size, then choose a color to
              represent live and dead cells
            </p>
            <p>2. Click the generate button to create the board,</p>
            <p>3. Click on a few grids to set up the initial state</p>
            {/* <p>or randomize the board for fast set up,</p> */}
            <p>4. then run the simulation!</p>
          </div>
          <div className="rules">
            <p> Rules Here: </p>
            <Popup
              trigger={<button className="btn"> Read Here</button>}
              modal
              closeOnDocumentClick
            >
              <section>
                <section>
                  <h3>Rules:</h3>
                  <p className="modalText">
                    -Any live cell with two or three live neighbours survives{" "}
                  </p>
                  <p className="modalText">
                    -Any dead cell with three live neighbours becomes a live
                    cell
                  </p>
                  <p className="modalText">
                    -All other live cells die in the next generation.
                  </p>
                  <p className="modalText">
                    Similarly, all other dead cells stay dead
                  </p>
                </section>
              </section>
            </Popup>
          </div>
        </section>
        {runningRef.current === true ? (
          <p className="generation">
            Ran all Simulations in {genRef.current} generations
          </p>
        ) : null}
        {gridstate.length === 0 ? (
          <form className="form" onSubmit={handleSubmit}>
            <section className="formInputs">
              <label className="labels">
                Columns:
                <input
                  className="input"
                  // placeholder="Set Rows"
                  type="text"
                  name="cols"
                  value={rowCols.cols}
                  onChange={handleChange}
                />
              </label>
              <label className="labels">
                Rows:
                <input
                  className="input"
                  // placeholder="Set Rows"
                  type="text"
                  name="rows"
                  value={rowCols.rows}
                  onChange={handleChange}
                />
              </label>
              <label className="labels">
                Dead Cell Color:
                <select
                  className="input"
                  // placeholder="Set Rows"
                  type="text"
                  name="deadCell"
                  value={gridColors.deadCell}
                  onChange={handleColors}
                >
                  <option value="none">---</option>
                  <option value={"black"}>{"black"}</option>
                  <option value={"purple"}>{"purple"}</option>
                  <option value={"#411f1f"}>{"maroon"}</option>
                  <option value={"#007dc1"}>{"blue"}</option>
                  <option value={"#222831"}>{"midnight sky"}</option>
                  <option value={"#ea907a"}>{"salmon"}</option>
                </select>
              </label>
              <label className="labels">
                Live Cell Color:
                <select
                  className="input"
                  // placeholder="Set Rows"
                  type="text"
                  name="liveCell"
                  value={gridColors.liveCell}
                  onChange={handleColors}
                >
                  <option value="none">---</option>
                  <option value={"yellow"}>{"yellow"}</option>
                  <option value={"white"}>{"white"}</option>
                  <option value={"green"}>{"green"}</option>
                  <option value={"orange"}>{"orange"}</option>
                  <option value={"gray"}>{"gray"}</option>
                  <option value={"red"}>{"red"}</option>
                </select>
              </label>
              <label className="labels">
                Speed:
                <select
                  className="input"
                  // placeholder="Set Rows"
                  type="text"
                  name="speed"
                  value={speed.speed}
                  onChange={handleSpeed}
                >
                  <option value="none">---</option>
                  <option value={"1000"}>{"normal"}</option>
                  <option value={"500"}>{"2x"}</option>
                  <option value={"250"}>{"4x"}</option>
                  <option value={"125"}>{"8x"}</option>
                  <option value={"100"}>{"10x"}</option>
                  <option value={"50"}>{"20x"}</option>
                </select>
              </label>
            </section>
          </form>
        ) : null}
        <section className="btn-container">
          {gridstate.length > 0 ? undefined : (
            <button className="btn" onClick={handleSubmit}>
              Generate Board
            </button>
          )}
          {running === false && gridstate.length > 0 ? (
            <button className="btn" onClick={resetGame}>
              Reset Board
            </button>
          ) : null}
          {/* 
          {gridstate.length > 0 ? (
            <button className="btn" onClick={handleRandom}>
              Randomize
            </button>
          ) : null} */}

          {gridstate.length === 0 ? null : (
            <button
              className="btn"
              onClick={() => {
                setRunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runSimulation();
                }
              }}
            >
              {running ? "Stop" : "Start"}
            </button>
          )}
        </section>
        {position === "absolute" ? null : (
          <section
            className="gameContainer"
            style={{ backgroundColor: gridColors.liveCell }}
          >
            {gridstate.map((y, index) => {
              return (
                <div className="rowContainer">
                  {y.map((x, ind) => {
                    // console.log("CHECK:", index, ind);
                    return (
                      <div
                        key={`${index}${ind}`}
                        onClick={
                          runningRef.current === false
                            ? () => {
                                console.log(
                                  "PASSED TO DIV:",
                                  index,
                                  ind,
                                  "REPRESENTED IN STATE:",
                                  gridstate[index][ind]
                                );
                                setgridState(
                                  produce(gridstate, (gridCopy) => {
                                    if (gridstate[index][ind] === 0) {
                                      gridCopy[index][ind] = 1;
                                    } else {
                                      if (gridstate[index][ind] === 1) {
                                        gridCopy[index][ind] = 0;
                                      }
                                    }
                                  })
                                );
                              }
                            : null
                        }
                        className="grid"
                        style={{
                          width: 10,
                          height: 10,
                          color: "white",
                          backgroundColor: gridstate[index][ind]
                            ? undefined
                            : gridColors.deadCell,
                          border: "1px solid white",
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </section>
        )}
        <section className="moreInfo">
          {gridstate.length > 0 ? (
            <p>
              Learn More About John Conway and The Game of Life:
              <a
                className="link"
                href="https://www.youtube.com/watch?v=R9Plq-D1gEk"
                target="_blank"
              >
                Here
              </a>{" "}
            </p>
          ) : (
            <img src={gif} className="gif" />
          )}
        </section>
        <footer style={{ position: "relative" }}>
          <p>
            Created By: John Conway (R.I.P - April 11, 2020), Re-Created by:
            Samuel Torres
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
