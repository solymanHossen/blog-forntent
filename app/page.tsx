import {HeroSection} from "@/components/HeroSection";
import {ThreeDCardDemo} from "@/components/TheeredCard";

export default async function Home() {
    let data: any = await fetch('http://localhost:5000/api/posts/', {
        cache: 'no-store'
    });
    if (!data.ok) {
        throw new Error(`failed to fetch ${data.status}`);
    }
    let posts:any = await data.json()

    return (
        <div>
            <HeroSection/>
            <div className='max-w-[88rem] mx-auto w-full px-8 md:py-[100px] py-[48px]'>
                <div className={'w-full h-full  grid grid-cols-1 md:grid-cols-3 gap-6'}>
                    {
                        posts.posts.map((post:any) => (<div key={post._id}>
                            <ThreeDCardDemo  post={post} />
                        </div>))
                    }
                </div>
            </div>

        </div>
    );
}
