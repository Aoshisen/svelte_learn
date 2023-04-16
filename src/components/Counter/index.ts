import { connect } from "svelte-redux-connect";
import Counter from "./Counter.svelte";
import { increment } from "../../store/counterSlice";
import { AppDispatch, RootState } from "src/store";

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    increment: () => dispatch(increment()),
  };
};

const mapStateToProps = ({ counter }: RootState) => ({
  counter,
});


export default connect(mapStateToProps, mapDispatchToProps)(Counter);
