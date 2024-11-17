import AuthButtons from './AuthButtons'

function Navbar() {
  return (
    <div className="flex justify-between items-center">
    <span className="text-lg font-semibold text-[#a6adba]">🔮 <span className="ml-2">MAIL MONSOON</span></span>
    <div className="text-center mt-4 space-x-4 flex justify-center">
      <div className="ml-auto mr-4">
      <AuthButtons/>
      </div>
    </div>
    </div>
  )
}

export default Navbar