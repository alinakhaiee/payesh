import React, { useEffect, useState } from "react";
import "./Select.css";
export default function SelectComponent({
  type = false,
  creatable = true,
  list = [],
  defaultSelected,
  onChange = (value) => console.log("selected", value),
}) {
  const [selected, setselected] = useState([]);
  const [showList, setshowList] = useState(false);
  const [selectList, setselectList] = useState([]);
  const [selectList1, setselectList1] = useState("empty");
  const [inputValue, setinputValue] = useState("");
  const handleShowList = () => {
    setshowList((stata) => !stata);
    document.getElementById("input").focus();
  };
  const hadleSelect = (item) => {
    if (type) {
      // let copy =[...selected]
      // copy.push(item)
      // setselected(copy)
      setselected([...selected, item]);
      let newList = selectList.filter((i) => i.value != item.value);
      setselectList(newList);
    } else {
      let newList = selectList.filter((i) => i.value != item.value);
      if (selected.length != 0) {
        if (list.some((item) => item.value == selected[0].value)) {
          newList = [...newList, selected[0]];
        }
      }
      setselectList(newList);
      setselected([item]);
    }

    document.getElementById("input").focus();
  };
  const cancelSelect = (item) => {
    let newList = selected.filter((i) => i.value != item.value);
    setselected(newList);
    if (list.some((item) => item.value == selected[0].value)) {
      // let copy=[...selectList]
      // copy.push(item)
      // setselectList(copy)
      setselectList([...selectList, item]);
    }
  };
  const cancelSelects=()=>{
    setselectList(list);
    setselected([])
  }
  const searchSelect = (event) => {
    setshowList(true);
    setinputValue(event.target.value);
    if (event.target.value == "") {
      setselectList1("empty");
    } else {
      let newList = selectList.filter(
        (item) => item.label.includes(event.target.value) == true
      );
      setselectList1(newList);
    }
  };
  const handleBackGrap = () => {
    setshowList(false);
  };
  const handleCreator = () => {
    if (inputValue != "") {
      let newObject = new Object();
      newObject.label = inputValue;
      newObject.value = inputValue;

      if (type) {
        let copy = [...selected];
        copy.push(newObject);
        setselected(copy);
      } else {
        if (
          selected[0] != undefined &&
          list.some((item) => item.value == selected[0].value)
        ) {
          let copy = [...selectList];
          copy.push(selected[0]);
          setselectList(copy);
        }
        setselected([newObject]);
      }

      setinputValue("");
      setselectList1("empty");
    }
  };
  useEffect(() => {
    onChange(selected);
  }, [selected]);
  useEffect(() => {
    if (defaultSelected) setselected(defaultSelected);
    console.log("moteza jooonnnnnnn", defaultSelected);
  }, [defaultSelected]);
  useEffect(() => {
    if(Array.isArray(defaultSelected)){
      let newlist = list.filter(
        (item) => defaultSelected.some((i) => i.value == item.value) != true
        );
        setselectList(newlist);
      }
      else{
        setselectList(list)
      }
  }, [list]);
  console.log("klkjkjkk", selected);
  return (
    <>
      {showList && <div className="back-grop" onClick={handleBackGrap}></div>}
      <div className="select-box">
        <div className="main" onClick={handleShowList}>
          <div className="main-selected">
          {selected.map((item, index) => {
            return (
              <label key={index} htmlFor="input" className="selected-item">
                <span onClick={() => cancelSelect(item)}>X</span>
                {item.label}
              </label>
            );
          })}

          <input
            style={{ width: `${(inputValue.length + 5) * 7}px` }}
            autocomplete="off"
            id="input"
            onChange={(e) => searchSelect(e)}
            className="input"
            value={inputValue}
          />
          </div>
          
        <div className="cansel-total">
        <span onClick={cancelSelects}>X</span>
        <span >X</span>
        </div>
        </div>
        {selectList1 == "empty"
          ? showList && (
              <div className="showList">
                {selectList.map((item, index) => {
                  return (
                    <div key={index} onClick={() => hadleSelect(item)}>
                      {item.label}
                    </div>
                  );
                })}
                {selectList.length == 0 && (
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
                {selectList1.map((item, index) => {
                  return (
                    <div key={index} onClick={() => hadleSelect(item)}>
                      {item.label}
                    </div>
                  );
                })}
                {(inputValue != "" || setselectList.length == 0) &&
                  selectList1.length == 0 && (
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
                {creatable && (
                  <div className="creater" onClick={handleCreator}>
                    Create {inputValue}
                  </div>
                )}
              </div>
            )}
      </div>
    </>
  );
}
