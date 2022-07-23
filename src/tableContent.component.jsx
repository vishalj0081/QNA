


const TableContent = ({ user, checkbox }) => {
    
    
return (
  <>
  
      {user.fork == false || checkbox ? (
          <div >
          <div className="col">{user.name}</div>
          <div className="col">{user.language}</div>
          <div className="col">{user.description}</div>
          <div className="col">{user.size}</div>
      </div>
      ) : (
     false
     )}
  </>
 );
}


export default TableContent;