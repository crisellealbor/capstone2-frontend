let adminUser = localStorage["isAdmin"];
let adminButton = document.querySelector('#adminButton');
let cardFooter;

if (adminUser == "false" || !adminUser) {
    adminButton.innerHTML = ""
} else {
    adminButton.innerHTML = `
<div class="col-md-2">
     <a href="./addCourse.html" class="btn btn-primary">Add Course</a>
   </div>
`
}

// fetch(url)
// .then(res)
// .then(data)
// .catch()

fetch('https://ca-coursebooking.herokuapp.com/api/courses')
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)

        function displayCardFooter(courseId) {
            if (adminUser == "false" || !adminUser) {
                cardFooter = `<a href="./course.html?courseId=${courseId}" class="btn btn-primary">Select course</a>`
            } else {
                cardFooter = `
                <a 
                    href="./editCourse.html?courseId=${courseId}" class="btn btn-primary editButton">
                    Edit
                </a>
                <a 
                    href="./deleteCourse.html?courseId=${courseId}" class="btn btn-danger deleteButton">
                    Delete
                </a>
            `
            }
            return cardFooter;
        }

        let courseContainer = document.querySelector('#courseContainer');
        let courseData = data.map(elem => {
            return `
                <div class="col-md-6 my-3">
                    <div class="card">
                       <div class="card-body">
                            <h5 class="card-title">${elem.name}</h5>
                            <p class="card-text text-right">&#8369; ${elem.price}</p>
                             <p class="card-text">${elem.description}</p>
                       </div>
                       <div class="card-footer">
                            ${displayCardFooter(elem._id)}
                       </div>
                    </div>
                </div>
            `
        })

        // let userProfile = document.querySelector('#userProfile');
 // let userName = data.map(elem => {
 //     return `
 //         <li class="nav-item">
 //             <a href="./profile.html" class="nav-link" id="userProfile">${data.firstName.lastName}</a>
 //         </li>
 //     `
 // })
        courseContainer.innerHTML = courseData.join("");
    })