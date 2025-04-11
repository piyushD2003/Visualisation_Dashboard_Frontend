import React from 'react'
import "../assets/Footer.css"
const Footer = () => {
    return (
        <>
            <footer class="text-center w-100 bg-body-tertiary">
                <div class="row">
                    
                    <p class="mb-0">
                        © 2025 Made With <span class="text-danger">&hearts;</span> By <strong>Piyush Dhyani</strong>
                    </p>
                    <ul class="list-inline">
                        <li class="list-inline-item"><a href="#">License</a></li>
                        <li class="list-inline-item"><a href="#">More Themes</a></li>
                        <li class="list-inline-item"><a href="#">Documentation</a></li>
                        <li class="list-inline-item"><a href="#">Support</a></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footer