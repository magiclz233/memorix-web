import { Link } from "@tanstack/react-router"

export const Memorix = () => {
    return (
        <div className="bg-white border-primary border-t-4 shadow-sm">
            <div className="container m-auto h-16 flex items-center gap-6">
                <span className="uppercase">Memorix</span>
                {/* <Link to="/front/topic">博客</Link> */}
                {/* <Link to="/front/live">直播</Link> */}
                <Link to="/front/photo">画廊</Link>
                <Link to="/front/all-photo">照片汇总</Link>
            </div>
        </div>
    )
}
