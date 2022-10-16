import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchAutoComplete from 'src/components/SearchAutoComplete';
import { getProvinceList } from "../../store/slices/location/locationSlice";
import "./styles.scss";
export default function SelectAreaHome({ onChange }) {

  const dispatch = useDispatch();
  const { provinceList } = useSelector((state) => state.location);

  React.useEffect(() => {
    dispatch(getProvinceList());
  }, [dispatch]);
  const handleLabel = (value) => {
    if (value === null) {
      onChange && onChange("")
    } else {
      onChange && onChange(value.name)
    }
  }
  return (

    <div className="config-select" style={{ fontSize: "14px" }}>
      <SearchAutoComplete
        data={provinceList}
        avatarRender={null}
        nameRender={(option) => option.name}
        labelName="Theo khu vực..."
        onChange={(event, value) => handleLabel(value)}
        register={(option) => option}
      />
    </div>
  );
}
