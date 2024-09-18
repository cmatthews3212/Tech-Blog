const submit = document.querySelector('.submit-comment');

const newCommentHandler = async () => {
    const comment = document.querySelector('#comments').value.trim();
    const blogpost = document.querySelector('#blog-container');
    const blogId = blogpost.getAttribute('data-id');

  
    if (comment) {
      const response = await fetch(`/api/blogposts/${blogId}`, {
        method: 'POST',
        body: JSON.stringify({ comment_content: comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // alert('it worked')
        console.log('RESPONSE:', response)
        document.location.replace(`/blogpost/${blogId}`);
     
      } else {
        alert('Failed to post comment');
        console.log(response)
      }
    }
}


submit.addEventListener('click', (event) => {
    event.preventDefault()
    newCommentHandler();

})