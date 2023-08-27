
const Card_ = ({className, children}) => {
  return (
    <article className= {`card_ ${className}`}>
        {children}
    </article>
  )
}

export default Card_