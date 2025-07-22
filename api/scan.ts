import api from "./axios";

type ScanProps = {
    qr_token: string,
    date_time:string,
    latitude:string,
    longitude:string,
}

export const scanQr = async (body:ScanProps) => {
  
  const { data } = await api.post("attendance", body);
  return data;
};
