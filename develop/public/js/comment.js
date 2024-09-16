// const newCommentHandler = async (event) => {
//     event.preventDefault();

//     const comment = document.querySelector('#comments').value.trim();

  
//     if (blogTitle && blogContent ) {
//       const response = await fetch(`/api/blogposts`, {
//         method: 'POST',
//         body: JSON.stringify({ blog_content: comment }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         alert('it worked')
//         // document.location.replace('/');
     
//       } else {
//         alert('Failed to post comment');
//         console.log(response)
//       }
//     }

//   };


document.querySelector('.submit-comment').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('clicked')
    
    })

  
  
    