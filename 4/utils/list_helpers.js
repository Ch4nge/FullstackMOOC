const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes =  blogs.reduce((sum, blog) => {
    return sum + blog.likes 
  },0)
  return likes
}

const favoriteBlog = (blogs) => {
  let blog = blogs.reduce((currentBlog, blog) => {
    if(currentBlog === null ){
      return blog
    }else if(currentBlog.likes < blog.likes){
      return blog
    }
    return currentBlog
  }, null)
  return blog
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return null;
  }
  let authors = blogs.reduce((authors, currentBlog) => {
    authors[currentBlog.author] = (authors[currentBlog.author] || 0) + 1
    return authors
  }, {})

  let author = 
    Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b);

  tempAuthors = Object.keys(authors).map(name => {
    return { author: name, blogs: authors[name] }
  })
  for(let i = 0; i < tempAuthors.length; i++){
    if(tempAuthors[i].author === author){
      return tempAuthors[i]
    }
  }
}
const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return null;
  }
  let authors = blogs.reduce((authors, currentBlog) => {
    authors[currentBlog.author] =
       (authors[currentBlog.author] || 0) + currentBlog.likes
    return authors
  }, {})

  let author = 
    Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b);

  tempAuthors = Object.keys(authors).map(name => {
    return { author: name, likes: authors[name] }
  })
  for(let i = 0; i < tempAuthors.length; i++){
    if(tempAuthors[i].author === author){
      return tempAuthors[i]
    }
  }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
