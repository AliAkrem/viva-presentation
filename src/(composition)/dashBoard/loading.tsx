import "../../app/globals.css";
export default function Loading() {
  return (
    <>
      <div className={"load"}>
        <div className="spinner-box">
          <div className="pulse-container">
            <div className="pulse-bubble pulse-bubble-1"></div>
            <div className="pulse-bubble pulse-bubble-2"></div>
            <div className="pulse-bubble pulse-bubble-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
