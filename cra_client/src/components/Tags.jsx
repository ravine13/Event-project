import { useEffect, useState } from 'react';
import { Routes, Route, useParams, NavLink } from 'react-router-dom';

function Tags() {
	const [tags, setTags] = useState([]);
	const { eventId } = useParams();
	const [newTag, setNewTag] = useState("");

	
	useEffect(() => {
		fetch(`https://event-project.onrender.com/hash_tags`)
		.then(response => response.json())
		.then(data => {
			setTags(data);
		})
	}, [eventId]);


	function handleTagSubmit(e){
		e.preventDefault();

		fetch('https://event-project.onrender.com/hash_tags', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ 'name': newTag, 'event_id' : eventId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTags(current => [...current, data]);
        setNewTag("");
      })
      .catch((error) => console.error("Error submitting tag:", error));
	}

	
	function handleTagDelete(tag_id){
		// if (window.confirm('Confirm Delete!')){
			fetch(`https://event-project.onrender.com/hash_tags/${tag_id}`, {
				method: 'DELETE'
			})
			.then(response => response.json())
			.then(() => {
				let filtered_tags = tags.filter((tag) => tag.id !== tag_id );
				setTags(filtered_tags);
			})
		// } else {
			// alert('Action Aborted!')
		// }
	}


	function handleUpdate(tag_id){
		fetch(`https://event-project.onrender.com/hash_tags/${tag_id}`, {
		method: "PATCH",
        headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ 'name': newTag }),
		})
		.then(response => response.json())
		.then((data) => {
			let updatedTags = tags.map((tag) => {
				if (tag.id === tag_id){
					return data
				} else {
					return tag
				}
			})
			setTags(updatedTags);
		})
	}


	let eventTags = tags.map((tag) => {
		if (tag.event_id === eventId) {
			return tag
		}
	})

	let tagCards = eventTags.map((tag) => {
		if ( tag !== undefined) {
			return (
				<div key={tag.id}>
					<div>
						<p className='text-white d-inline'>{tag.name}</p>
						<NavLink to={`/event/${eventId}/tags/edit`} exact>
							<img src="https://cdn-icons-png.flaticon.com/128/860/860814.png" alt="NA" width={25} />
						</NavLink>
						<button className='delete-btn border-0' onClick={() => handleTagDelete(tag.id)}>
							<img src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="NA" width={25} />
						</button>
					</div>
					<Routes>
						<Route path='/edit' element={
						<div>
							<textarea 
								className='bg-white text-black'
								name="" 
								id="" 
								cols="60" 
								rows="1"
								placeholder={tag.name}
								onChange={(e) => setNewTag(e.target.value)}
							></textarea>
								<button onClick={() => {handleUpdate(tag.id)}}>
									<img src="https://cdn-icons-png.flaticon.com/128/1828/1828640.png" alt="NA" width={30}/>
								</button>
						</div>
						} exact></Route>
					</Routes>
				</div>
			);
		}
	});


	return (
		<div>
			{tagCards}
			<form action="" onSubmit={handleTagSubmit}>
				<textarea 
				className='bg-white text-black'
				name="" 
				id="" 
				cols="60"
				rows="2"
				onChange={(e) => {
							setNewTag(e.target.value);
							console.log(eventId);
						}
					}
				></textarea>
				<button className='border-0' type='submit'>
					<img src="https://cdn-icons-png.flaticon.com/128/10337/10337579.png" alt="NA" width={30}/>
				</button>
			</form>
		</div>
	);
}

export default Tags;


