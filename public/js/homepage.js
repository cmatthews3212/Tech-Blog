const blogs = document.getElementsByClassName('blogs');
const blogId = document.querySelector('.blogId')


for(const blog of blogs) {

        blog.addEventListener('click', (event) => {
            const id = blog.getAttribute('id');
                location.replace(`blogpost/${id}`)
            

        })


}
