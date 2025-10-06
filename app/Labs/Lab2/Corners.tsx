export default function Corners() {
  return (
    <div id="wd-css-borders">
      <h3>Rounded corners</h3>
      <p
        className="wd-rounded-corners-top wd-border-thin 
     wd-border-blue wd-border-solid wd-padding-fat wd-bg-color-transparent wd-fg-color-black"
      >
        Rounded corners on the top{" "}
      </p>
      <p
        className="wd-rounded-corners-bottom 
     wd-border-thin wd-border-blue wd-border-solid wd-padding-fat wd-bg-color-transparent wd-fg-color-black"
      >
        Rounded corners at the bottom{" "}
      </p>
      <p
        className="wd-rounded-corners-all-around 
     wd-border-thin wd-border-blue wd-border-solid wd-padding-fat wd-bg-color-transparent wd-fg-color-black"
      >
        Rounded corners all around{" "}
      </p>
      <p
        className="wd-rounded-corners-inline 
     wd-border-thin wd-border-blue wd-border-solid wd-padding-fat wd-bg-color-transparent wd-fg-color-black"
      >
        Different rounded corners{" "}
      </p>
    </div>
  );
}
