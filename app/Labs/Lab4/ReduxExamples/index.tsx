import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

export default function HelloRedux() {
  const { message } = useSelector((state: RootState) => state.helloReducer);
  return (
    <div>
      <h2>Redux Examples</h2>
      <div id="wd-hello-redux">
        <h3>Hello Redux</h3>
        <h4>{message}</h4> <hr />
      </div>
    </div>
  );
}
