import '../pages/style/ScrollUp.css'

const ScrollUp = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    <div className='button-scroll'>
      <button onClick={handleScroll}><i className="fa-solid fa-chevron-up"></i></button>
    </div>
  )
}

export default ScrollUp