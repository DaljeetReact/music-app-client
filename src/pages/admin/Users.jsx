import { useSelector } from 'react-redux';

function Users() {

  const users = useSelector(state => state.users);

  const RenderColumns = ({ user, index }) => {
    if (user.role === "admin") {
      return;
    }
    return (
      <tr key={index} className=' hover:bg-slate-200'>
        <td className='p-3'><img src={user.imgUrl} alt={user.name} referrerPolicy='no-referrer' className='w-10 rounded-full' /></td>
        <td className='p-3'>{user.name}</td>
        <td className='p-3'>{user.email}</td>
        <td className='p-3'>{user.email_verified ? "yes" : "no"}</td>
        <td className='p-3'>{new Date(user.createdAt).toLocaleString()}</td>
        <td className='p-3'>{user.role}</td>
      </tr>
    )
  }

  return (
    <div className='w-[80%] m-auto border-1 border-black mt-20 p-5 shadow-sm rounded-xl relative  backdrop-blur-3xl overflow-hidden '>
      <div className="absolute top-0 bottom-0 left-0 right-0  bg-white opacity-[0.5]"></div>
      <div className='flex justify-between mb-5 items-center relative z-10'>
        <span>Count: <b>{users.length}</b></span>
        <div>
          <input type='search' placeholder='search' className='rounded-full p-2' />
        </div>
      </div>
      <table class="table-auto w-full border-collapse text-left relative z-10">
        <thead className='pb-4'>
          <tr>
            <th className='pb-4'>Image</th>
            <th className='pb-4'>Name</th>
            <th className='pb-4'>Email</th>
            <th className='pb-4'>verified</th>
            <th className='pb-4'>Created</th>
            <th className='pb-4'>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            <>
              {users.map((user, index) => <RenderColumns user={user} key={index} />)}
            </>
          ) : (
            <tr >
              <td colSpan="6" className='text-center pt-5'>No User Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users