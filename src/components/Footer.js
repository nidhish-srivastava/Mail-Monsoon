"use client"
function Footer() {
    return (
        <div className=" pb-32">
            <hr className="w-full opacity-10 pt-16" />
            <div className="flex flex-col items-center gap-1 text-[#a6adba]">
                <p><span className="text-sm font-semibold">Mail Monsoon - An app by </span><u><a target="_blank" href="https://github.com/nidhish-srivastava">Nidhish</a></u></p>
                <p className="text-sm">Copyright &copy; {new Date().getFullYear()} - All Right reserved</p>
            </div>
        </div>
    )
}

export default Footer