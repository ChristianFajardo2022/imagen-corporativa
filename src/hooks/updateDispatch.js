import { useDispatch } from "react-redux";
import { setData } from "../store/slices/counter/counterSlides";

const useUpdateFormData = () => {
  const dispatch = useDispatch();

  const updateField = (name, value) => {
    dispatch(setData({ key: name, value: value }));
  };

  return { updateField };
};

export default useUpdateFormData;
