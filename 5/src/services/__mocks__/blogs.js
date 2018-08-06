const getAll = () => {
  const blogs = [
    {
      id: "2268d2fe66o3269ab8d3728s",
      title: "Testi",
      author: "TestiAuthor",
      url: "www.testiurli.com",
      likes: 2,
      __v: 0
    },
    {
      id: "5a2la562il34d49373ceio12",
      title: "Testi2",
      author: "TestiAuthor2",
      url: "Testiurli2.com",
      likes: 1,
      __v: 0
    },
  ]
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
}

export default { getAll, setToken }

