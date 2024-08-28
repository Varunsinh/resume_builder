import { Link } from 'react-router-dom';
import User from '../assets/user.svg';
import ResumeImg from '../assets/resume-img.svg';
import PersonMobile from '../assets/person-mobile.svg';
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import About from '../components/About';

const Home = () => {
    return (
        <>
            <section className="flex items-center justify-around mt-8">
                <div className="h-auto w-[491px]">
                    <div className="text-[#4E4D4D] font-medium text-xl">BOOST YOUR CAREER CHASING</div>
                    <h1 className="font-bold text-5xl leading-[50px] my-2">Land your dream job <br /> with already made <br />
                        <span className="text-[#8910F1]">Eye catchy Resumes.</span>
                    </h1>
                    <div className="text-[#4E4D4D] font-medium mb-5 text-lg">Create awesome resumes with one of our <br /> template in just few seconds.</div>
                    <Link to={'user/login'} className='py-3 px-7 rounded-md bg-[#8910F1] text-white text-'>Create Resume for free</Link>
                </div>
                <div className="flex">
                    <div className="bg-white h-fit p-5 pb-8 absolute right-[25%] top-[28%] shadow">
                        <img src={User} alt="" width={150} />
                        <p className="text-[#191919] text-base bg-white -mb-1 font-medium">Rahul saini</p>
                        <span className="text-[#4E4D4D] text-sm bg-white">FrontEnd Developer</span>
                    </div>
                    <div>
                        <img src={ResumeImg} alt="" width={300} />
                    </div>
                </div>
            </section>

            <About />

            <section className="py-20 flex items-center justify-around border-b-2 border-b-[#B1B1B1]">
                <div className='w-[500px] bg-transparent'>
                    <h2 className='font-medium text-5xl text-[#191919] mb-2 leading-[60px]'>Join the 2000+ <br />
                        Resum<span className='text-[#8910F1]'>o</span> family</h2>
                    <p className="text-[#4E4D4D] text-xl bg-transparent">Fames ac turpis egestas sed.</p>
                    <p className="text-[#4E4D4D] text-xl bg-transparent">Sagittis vitae et leo duis.</p>
                    <p className="text-[#4E4D4D] text-xl mb-5 bg-transparent">Duis at consectetur lorem donec massa. </p>
                    <Link to={'user/login'} className='py-3 px-7 rounded-md bg-[#8910F1] text-white'>Create Resume for free</Link>
                </div>
                <div className='bg-transparent'><img src={PersonMobile} alt="" width={400} className='bg-transparent mr-16' /></div>
            </section>
            <div className='h-[170px] w-[87%] bg-[#f6cdde] mx-auto -mt-[195px]' />

            <footer className='my-20 flex justify-around pt-10'>
                <div>
                    <h2 className='text-2xl font-medium'>Resum<span className='text-[#8910F1]'>o</span></h2>
                    <span className='text-[#2D2D2D]'>Updates right to your Inbox</span>
                    <div className='flex gap-x-3 mb-6 mt-16'>
                        <input type="text" placeholder='Email Address' className='border p-2 rounded-md w-80' />
                        <button className='bg-[#8910F1] py-2 px-5 font-light rounded-md text-white'>Subscribe</button>
                    </div>
                    <ul className='flex gap-x-8 font-medium mt-5'>
                        <li><a href="#">Resums<span className='text-[#8910F1]'>o</span>2024</a></li>
                        <li><a href="#">Privacy policy</a></li>
                        <li><a href="#">Terms of use</a></li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <div className='flex justify-center gap-x-14 mb-6 mt-0'>
                        <ul className='text-base'>
                            <li className='font-medium mb-2 text-lg'>Our story</li>
                            <li className='mb-2'><Link to={'#'}>FAQ</Link></li>
                            <li><Link to={'#'}>Contact</Link></li>
                        </ul>
                        <ul className='text-base'>
                            <li className='font-medium mb-2 text-lg'>Services</li>
                            <li className='mb-2'><Link to={'/resume-builder'}>Build Resume</Link></li>
                            <li className='mb-2'><Link to={'#'}>Cover Letter</Link></li>
                            <li><Link to={'/templates'}>Template</Link></li>
                        </ul>
                        <ul className='text-base'>
                            <li className='font-medium mb-2 text-lg'>About us</li>
                            <li className='mb-2'><Link to={'#'}>Developers</Link></li>
                            <li className='mb-2'><Link to={'#'}>Meet our teams</Link></li>
                            <li><Link to={'#'}>Join Tabulio</Link></li>
                        </ul>
                    </div>
                    <ul className='flex justify-center gap-x-10'>
                        <li>
                            <Link to={'/'} className='text-white'>
                                <TiSocialFacebook className='w-7 h-7 p-[1px] bg-[#8910F1] rounded-full' />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='text-white'>
                                <TiSocialLinkedin className='w-7 h-7 p-[1px] bg-[#8910F1] rounded-full' />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='text-white'>
                                <AiFillInstagram className='w-7 h-7 p-1 bg-[#8910F1] rounded-full' />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='text-white'>
                                <RiTwitterXFill className='w-7 h-7 p-1 bg-[#8910F1] rounded-full' />
                            </Link>
                        </li>
                    </ul>
                </div>

            </footer>
        </>
    )
}

export default Home