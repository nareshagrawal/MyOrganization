import React from 'react'
import { Link } from 'react-router-dom'
export const LeftComponent = () => {
    return (



        // <div className="container">

        <div class="row">
            <div class="col-lg-3 col-sm-6">
                <div class="card-box bg-blue">
                    <div class="inner">
                        <h3> Calender Events </h3>
                    </div>
                    <div class="icon">
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                    </div>
                    <Link to="/calendar" class="card-box-footer">View More <i class="fa fa-arrow-circle-right"></i></Link>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6">
                <div class="card-box bg-green">
                    <div class="inner">
                        <h3>  Organization Chart </h3>

                    </div>
                    <div class="icon">
                        <i class="fa fa-users" aria-hidden="true"></i>
                    </div>
                    <Link to="/orgchart" class="card-box-footer">View More <i class="fa fa-arrow-circle-right">
                    </i></Link>
                </div>
            </div>


            <div class="col-lg-3 col-sm-6">
                <div class="card-box bg-orange">
                    <div class="inner">
                        <h3> Chat with People  </h3>
                    </div>
                    <div class="icon">
                        <i class="fa fa-comments-o" aria-hidden="true"></i>
                    </div>
                    <Link to="/messages" class="card-box-footer">View More
                     <i class="fa fa-arrow-circle-right"></i></Link>
                </div>
            </div>


            {/* <div class="col-lg-3 col-sm-6">
                <div class="card-box bg-red">
                    <div class="inner">
                        <h3> 723 </h3>
                        <p> Faculty Strength </p>
                    </div>
                    <div class="icon">
                        <i class="fa fa-users"></i>
                    </div>
                    <a href="#" class="card-box-footer">View More <i class="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>   */}
        </div>

        // </div>


    )
}
