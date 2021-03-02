import React, { useEffect, useState } from "react";
import "./Select.css";
export default function SelectComponent({ type=false, list=[],defaultSelected=[],onChange=(value)=>console.log("selected",value) }) {
  const [selected, setselected] = useState(defaultSelected);
  const [showList, setshowList] = useState(false);
  const [selectList, setselectList] = useState(list);
  const [selectList1, setselectList1] = useState("empty");
  const [inputValue, setinputValue] = useState("");
  const handleShowList = () => {
    setshowList((stata) => !stata);
    document.getElementById("input").focus();
  };
  const hadleSelect = (item) => {
   
    if (type) {
      let copy =[...selected]
      copy.push(item)
      setselected(copy)
      let newList = selectList.filter((i) => Object.keys(i)[0]!= Object.keys(item)[0]);
      setselectList(newList);
    } else {
      let newList = selectList.filter((i) => i != item);
      if (selected.length != 0) {
        if (list.some((item) => item == selected[0])) {
          newList = [...newList, selected[0]];
        }
      }
      setselectList(newList);
      setselected([item]);
    }

    document.getElementById("input").focus();
  };
  const cancelSelect = (item) => {
    let newList = selected.filter((i) => Object.keys(i)[0] != Object.keys(item)[0]);
    setselected(newList);
    if (list.some((item) => Object.keys(item)[0] == Object.keys(selected[0])[0] )) {
      let copy=[...selectList]
      copy.push(item)
      setselectList(copy)
    }
  };
  const searchSelect = (event) => {
    setshowList(true);
    setinputValue(event.target.value);
    if (event.target.value == "") {
      setselectList1("empty");
    } else {
      let newList = selectList.filter(
        (item) => Object.values(item)[0].includes(event.target.value) == true
      );
      setselectList1(newList);
    }
  };
  const handleBackGrap = () => {
    setshowList(false);
  };
  const handleCreator = () => {
    if (inputValue != "") {
      let newObject=new Object();
      newObject[inputValue]=inputValue;

      if (type) {
        let copy=[...selected]
        copy.push(newObject)
        setselected(copy);
      } else {
        if (selected[0]!=undefined && list.some((item) => Object.keys(item)[0] == Object.keys(selected[0])[0])) {
        let copy=[...selectList]
        copy.push(selected[0])
        setselectList(copy);
        }
        setselected([newObject]);
      }

      setinputValue("");
      setselectList1("empty");
    }
  };
  useEffect(() => {
    onChange(selected)
  }, [selected]);
  return (
    <>
      {showList && <div className="back-grop" onClick={handleBackGrap}></div>}
      <div className="select-box">
        <div className="main" onClick={handleShowList}>
          {selected.map((item) => {
            return (
              <label htmlFor="input" className="selected-item">
                <span onClick={() => cancelSelect(item)}>X</span>
                {Object.values(item)}
              </label>
            );
          })}

          <input
            id="input"
            onChange={(e) => searchSelect(e)}
            className="input"
            value={inputValue}
          />
        </div>
        {selectList1 == "empty"
          ? showList && (
              <div className="showList">
                {selectList.map((item) => {
                  return <div onClick={() => hadleSelect(item)}>{Object.values(item)}</div>;
                })}
                {selectList.length==0 && (
                  <div
                    style={{
                      fontSize: "40px",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    Not Found
                  </div>
                )}
              </div>
            )
          : showList && (
              <div className="showList">
                {selectList1.map((item) => {
                  return <div onClick={() => hadleSelect(item)}>{Object.values(item)}</div>;
                })}
                {(inputValue!="" || setselectList.length==0) && selectList1.length==0 && (
                  <div
                    style={{
                      fontSize: "40px",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    Not Found
                  </div>
                )}
                <div className="creater" onClick={handleCreator}>
                  Create {inputValue}
                </div>
              </div>
            )}
      </div>
    </>
  );
}
