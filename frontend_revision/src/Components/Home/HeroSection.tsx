import Banner1 from "../../assets/images/banner-1.png";
import Banner2 from "../../assets/images/banner-2.png";
import Banner3 from "../../assets/images/banner-3.png";

export default function HeroSection() {
    const images = [Banner1, Banner2, Banner3];
    return (
        <div className="w-screen h-full flex justify-between px-30 my-10">
            <div className="flex flex-col w-1/3 ">
                <h2 className="font-extrabold text-[2vw]">Découvrez le pouvoir du savoir avec <span className="uppercase">MyRévision</span>.</h2>
                <p className="text-[.8vw] text-gray-500 py-3">Votre passerelle vers une éducation de qualité à Madagascar. Apprenez à votre rythme, développez vos compétences et atteignez vos objectifs académiques et professionnels.</p>
                <button className="w-[18vw] bg-[var(--primary-color)] text-sm px-2 py-1 rounded-lg text-white">Commencer votre parcours</button>
            </div>
            <div className="relative flex items-center justify-center gap-4">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Banner ${index + 1}`}
                        className="w-32 h-50 object-cover rounded-lg shadow-md"
                    />
                ))}
            </div>
        </div>
    )
}
