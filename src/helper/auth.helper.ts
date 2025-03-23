

export const ValidateUser = async (user: any) => {
   const validUser = ListValidUsers.find((item) => item.username === user.username && item.password === user.password)
   return validUser;
}

const ListValidUsers = [
    {
        username: 'admin',
        password: 'admin',
        permission: ['admin']
    },
    {
        username: 'user',
        password: 'user',
        permission: ['operator']
    }
]

