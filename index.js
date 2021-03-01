import React, { useState } from "react";
import "./Select.css";
export default function SelectComponent() {
  const [selected, setselected] = useState([]);
  const [showList, setshowList] = useState(false);
  const [selectList, setselectList] = useState([
    "ali Nakhaiee",
    "razieh Nakhaiee",
    "reaza",
    "lila",
    "baba",
    "hossin Nakhaiee",
  ]);
  const [selectList1,setselectList1]=useState("empty")
  const handleShowList = () => {
    setshowList((stata) => !stata);
    document.getElementById("input").focus();
  };
  const hadleSelect = (item) => {
    console.log(item);
    setselected([...selected, item]);
    let newList = selectList.filter((i) => i != item);
    setselectList(newList);
    document.getElementById("input").focus();
  };
  const cancelSelect = (item) => {
    let newList = selected.filter((i) => i != item);
    setselected(newList);
    setselectList([...selectList, item]);
  };
  const searchSelect = (event) => {
    if((event.target.value)==""){
      setselectList1("empty")
    }
    else{
      let newList = selectList.filter((item) =>item.includes(event.target.value)==true)
      console.log("new", newList);
      setselectList1(newList);
    }
    
  };
  const handleBackGrap=()=>{
    setshowList(false)
  }
  return (
    <>
      {showList && <div className="back-grop" onClick={handleBackGrap}></div>}
      <div className="select-box">
        <div className="main" onClick={handleShowList}>
          {selected.map((item) => {
            return (
              <label htmlFor="input" className="selected-item">
                <span onClick={() => cancelSelect(item)}>X</span>
                {item}
              </label>
            );
          })}

          <input
            id="input"
            onChange={(e) => searchSelect(e)}
            className="input"
          />
        </div>
        {selectList1=="empty"?
        showList && (
          <div className="showList">
            {selectList.map((item) => {
              return <div onClick={() => hadleSelect(item)}>{item}</div>;
            })}
          </div>
        ): showList && (
          <div className="showList">
            {selectList1.map((item) => {
              return <div onClick={() => hadleSelect(item)}>{item}</div>;
            })}
          </div>
        )
        }
      </div>
    </>
  );
}
