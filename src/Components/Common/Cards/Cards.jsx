import "./Cards.css";

const Cards = ({data}) => {
    const {make, image, model, mileage, owners, year} = data;
  return (
    <div>
      <div className="card" style={{width: '18rem'}}>
  <img src={image} className="card-img-top" alt="..."/>
  <div className="card-body">
    <div className="heading-wrapper">
    <h5 className="card-title">{make}</h5>
    <h6><span>Model:</span> {model}</h6>
    <h6><span>Mileage:</span> {mileage}</h6>
    <h6><span>Owners:</span> {owners}</h6>
    <h6><span>Year:</span> {year}</h6>
    </div>
  </div>
</div>
    </div>
  )
}

export default Cards
