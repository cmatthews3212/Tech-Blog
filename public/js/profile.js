const newFormHandler = async (event) => {
    event.preventDefault();
  
    const blogTitle = document.querySelector('#blog-title').value.trim();
    const blogContent = document.querySelector('#blog-content').value.trim();

  
    if (blogTitle && blogContent ) {
      const response = await fetch(`/api/blogPosts`, {
        method: 'POST',
        body: JSON.stringify({ blogTitle, blogContent }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
        console.log(response)
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogposts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-blog-post-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.blog-post-list')
    .addEventListener('click', delButtonHandler);
  