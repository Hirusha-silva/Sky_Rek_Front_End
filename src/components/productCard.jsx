export default function ProductCard(props) {
    console.log(props);
    
    return (
        <div>
            <h1>{props.name}</h1>
            <img src={props.url}/>
            <p>Price {props.price}</p>
            <button>View More</button>
        </div>
    )
}