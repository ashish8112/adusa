function StudentCard({name,college,branch})
{
    return (
        <div>
            <h2>{name}</h2>
            <p>College: {college}</p>
            <p>Branch : {branch}</p>
        </div>
    );
}

export default StudentCard;