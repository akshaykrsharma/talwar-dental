// Single place where image files are imported. Components never import image paths directly.
import reception from "./clinic/reception.jpg";
import waitingLounge from "./clinic/waiting-lounge.jpg";
import xrayUnit from "./clinic/xray-unit.jpg";
import treatmentRoom from "./clinic/treatment-room.jpg";
import frontDesk from "./clinic/front-desk.jpg";
import dentalChair from "./clinic/dental-chair.jpg";
import xrayScreenRoom from "./clinic/xray-screen-room.jpg";
import drAnishTalwar from "./doctor/dr-anish-talwar.webp";

export const clinicPhotos = {
  reception,
  waitingLounge,
  xrayUnit,
  treatmentRoom,
  frontDesk,
  dentalChair,
  xrayScreenRoom,
};

export const doctorPortrait = {
  src: drAnishTalwar,
  width: 864,
  height: 905,
};
