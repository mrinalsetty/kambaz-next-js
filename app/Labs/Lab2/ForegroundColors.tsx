export default function ForegroundColors() {
  return (
    <div id="wd-css-colors">
      <h2>Colors</h2>
      <h3 className="wd-fg-color-blue">Foreground color</h3>
      <p className="wd-fg-color-red wd-bg-color-transparent">
        The text in this paragraph is red but
        <span className="wd-fg-color-green wd-bg-color-transparent">
          {" "}
          this text is green
        </span>
      </p>
    </div>
  );
}
