// import LogoImage from "../assets/movie_camera.jpg";
import LogoImage from "../assets/masks.png";

export default function Logo() {
  return (
    <div className="logo__container">
      <img src={LogoImage} alt="logo" className="logo__img" />
      <span>Cinemate</span>
    </div>
  );
}
