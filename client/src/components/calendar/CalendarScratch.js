import React from "react";
import Day from "./Day";
import "./calendarscratch.css";

function CalendarScratch() {
  let days = [];
  for (let i = 0; i < 32; i++) {
    days.push(i);
  }

  return (
    <div className="main-page">
      <div className="grid-container">
        {days.map((day, index) => {
          return <Day key={index} day={day} />;
        })}
        {/* <div className="grid-item"> */}

        {/* <div class="grid-item grid-item-1">1</div>
        <div class="grid-item grid-item-2">2</div>
        <div class="grid-item grid-item-3">3</div>
        <div class="grid-item grid-item-4">4</div>
        <div class="grid-item grid-item-5">5</div>
        <div class="grid-item grid-item-6">6</div>
        <div class="grid-item grid-item-7">7</div>
        <div class="grid-item grid-item-8">8</div>
        <div class="grid-item grid-item-9">8</div>
        <div class="grid-item grid-item-10">10</div>
        <div class="grid-item grid-item-11">11</div>
        <div class="grid-item grid-item-12">12</div>
        <div class="grid-item grid-item-13">13</div>
        <div class="grid-item grid-item-14">14</div>
        <div class="grid-item grid-item-15">15</div>
        <div class="grid-item grid-item-16">16</div>
        <div class="grid-item grid-item-17">17</div>
        <div class="grid-item grid-item-18">18</div>
        <div class="grid-item grid-item-19">19</div>
        <div class="grid-item grid-item-20">20</div>
        <div class="grid-item grid-item-21">21</div>
        <div class="grid-item grid-item-22">22</div>
        <div class="grid-item grid-item-23">23</div>
        <div class="grid-item grid-item-24">24</div>
        <div class="grid-item grid-item-25">25</div>
        <div class="grid-item grid-item-26">26</div>
        <div class="grid-item grid-item-27">27</div>
        <div class="grid-item grid-item-28">28</div>
        <div class="grid-item grid-item-29">29</div>
        <div class="grid-item grid-item-30">30</div>
        <div class="grid-item grid-item-31">31</div> */}
      </div>
    </div>
  );
}

export default CalendarScratch;
