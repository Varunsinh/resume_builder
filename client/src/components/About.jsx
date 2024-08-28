import Arrow1 from '../assets/icons/arrow1.svg';
import Arrow2 from '../assets/icons/arrow2.svg';
import ResumeImg2 from '../assets/resume2.svg';

const About = () => {
  return (
    <section className='my-10'>
    <center className="text-[#8910F1] font-semibold text-3xl mx-auto my-14">Features</center>
    <div className="flex justify-around items-center">

        <div className="w-[450px]">
            <h3 className="font-semibold text-[#191919] text-2xl mb-3">30+ Templates</h3>
            <p className="text-[#4E4D4D] text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod in pellentesque massa placerat duis</p>
            <img src={ResumeImg2} alt="" className="my-10" />
            <h3 className="font-semibold text-[#191919] text-2xl mb-3">Easy to Customize</h3>
            <p className="text-[#4E4D4D] text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod in pellentesque massa placerat duis</p>
        </div>

        <div className="w-[450px]">
            <img src={Arrow1} alt="" className="relative w-[250px] right-[40%]" />
            <h3 className="font-semibold text-[#191919] text-2xl mb-3">Free Cover Letter</h3>
            <p className="text-[#4E4D4D] text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod in pellentesque massa placerat duis</p>
            <img src={Arrow2} alt="" className="relative w-[300px] right-[40%] mt-5 ml-4" />
        </div>
    </div>
</section>
  )
}

export default About