gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

if (ScrollTrigger.isTouch !==1) {
    ScrollSmoother.create({
        wrapper: '.wrapper',
        content: '.content',
        smooth: 1.5,
        effects: true
    })

    gsap.fromTo('.hero-section', { opacity: 1 }, {
		opacity: 0.1,
		scrollTrigger: {
			trigger: '.hero-section',
			start: 'center',
			end: '1020',
			scrub: true
		}
	})

    let itemsL = gsap.utils.toArray('.gallery__left .gallery__item')

	itemsL.forEach(item => {
		gsap.fromTo(item, { opacity: 0.01, x: -50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-850',
				end: '-100',
				scrub: true
			}
		})
	})

	let itemsR = gsap.utils.toArray('.gallery__right .gallery__item')

	itemsR.forEach(item => {
		gsap.fromTo(item, { opacity: 0.01, x: 50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-750',
				end: 'top',
				scrub: true
			}
		})
	})
}
let svgns = "http://www.w3.org/2000/svg";
let root = document.querySelector("svg");
let ease = 0.75;

let pointer = { 
  x: window.innerWidth  / 2, 
  y: window.innerHeight / 2 
};

window.addEventListener("mousemove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});

let leader = (prop) => {
  return prop === "x" ? pointer.x : pointer.y;
}

let total = 100;
for (let i = 0; i < total; i++) {
  leader = createLine(leader, i);
}

function createLine(leader, i) {
  
  let line = document.createElementNS(svgns, "line");
  root.appendChild(line);
  
  gsap.set(line, { x: -15, y: -15, opacity: (total - i) / total });
  
  let pos = gsap.getProperty(line);
    
  gsap.to(line, {
    duration: 1000,
    x: "+=1",
    y: "+=1",
    repeat: -1,
    ease: "none",
    modifiers: {
      x: () => {        
        let posX = pos("x");
        let leaderX = leader("x");
        let x = posX + (leaderX - posX) * ease;
        line.setAttribute("x2", leaderX - x);
        return x;
      },
      y: () => {        
        let posY = pos("y");
        let leaderY = leader("y");
        let y = posY + (leaderY - posY) * ease;
        line.setAttribute("y2", leaderY - y);
        return y;
      }
    }
  });  
  
  return pos;
}