import { useRecoilState } from "recoil";

import { contractState } from "../atom/contractState";
import { useEffect } from "react";

function AddSmartphoneView() {
  const [contract] = useRecoilState(contractState);

  useEffect(() => {
    console.log(contract);
  }, [contract]);

  return (
    <>
      <h1>Add</h1>
    </>
  );
}

export default AddSmartphoneView;
