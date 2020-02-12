const width = 1440;
const height = 900;
const node_width = 50;
const node_hoffset = 75;
const node_voffset = 100;
let highlighted = false;

function setup() {
  // put setup code here
  createCanvas(width, height);
  background(51);
  rectMode(CENTER);
  
  textSize(48);
  textFont('Courier');
  textAlign(CENTER, CENTER);
  text('Linked List Visualizer', width / 2, height * 0.05);

  drawLink(test, 'white');
  drawRepr(test, test.repr, 'black', false);
  indicator(test, test, false);
}

function draw() {
  // put drawing code here 
}

function mousePressed() {
  if (!highlighted){
    for (let i = 0; i < sublinks.length; i += 1) {
      if (sublinks[i].x - 0.6 * node_width <= mouseX
         && mouseX <= sublinks[i].x - 0.4 * node_width
         && sublinks[i].y - node_width / 4 <= mouseY
         && mouseY <= sublinks[i].y + node_width / 4) {
        fill('green');
        text(sublinks[i].first, sublinks[i].x - node_width / 2, sublinks[i].y);
        drawRepr(test, sublinks[i].repr, 'green', true);
        text(indicator(test, sublinks[i], true), width / 2, 0.8 * height + 90);
        fill('black');
      }
      else if (mouseX <= sublinks[sublinks.length - 1].x + node_width
              && mouseX >= sublinks[sublinks.length - 1].x 
              && sublinks[sublinks.length - 1].y - node_width / 2 <= mouseY
              && sublinks[sublinks.length - 1].y + node_width / 2 >= mouseY) {
        drawRepr(test, 'null', 'green', false);
        fill('green');
        square(sublinks[sublinks.length - 1].x + node_width / 2, sublinks[sublinks.length - 1].y, node_width);
        fill('black');
        line(sublinks[sublinks.length - 1].x, sublinks[sublinks.length - 1].y - node_width / 2, sublinks[sublinks.length - 1].x + node_width, sublinks[sublinks.length - 1].y + node_width / 2);
        text(indicator(test, null, false), width / 2, 0.8 * height + 90);
      }
      else if (sublinks[i].x - node_width <= mouseX 
          && mouseX <= sublinks[i].x + node_width 
          && sublinks[i].y - node_width / 2 <= mouseY 
          && mouseY <= sublinks[i].y + node_width / 2) {
        drawLink(sublinks[i], 'green');
        drawRepr(test, sublinks[i].repr, 'green', false);
        text(indicator(test, sublinks[i], false), width / 2, 0.8 * height + 90);
      }
    }
    highlighted = true;
  }
  else {
    drawLink(test, 'white');
    drawRepr(test, test, 'black', false);
    fill(51);
    rect(width / 2, 0.8 * height + 90, 1100, 120);
    highlighted = false;
  }
}

function drawLink(s, color) {
  fill(color); strokeWeight(2); textSize(28); textAlign(CENTER);

  square(s.x - node_width / 2, s.y, node_width);
  square(s.x + node_width / 2, s.y, node_width);
  fill('black'); 
  text(s.first, s.x - node_width / 2, s.y);

  if (s.rest == null) {
    line(s.x, s.y - node_width / 2, s.x + node_width, s.y + node_width / 2);
  }
  else {
    strokeWeight(8); point(s.x + node_width / 2, s.y); strokeWeight(2); 
    if (s.rest.y > s.y) {
      line(s.x + node_width / 2, s.y, s.x + node_width / 2, s.y + node_width);
      line(s.x + node_width / 2, s.y + 2 * node_width / 2, s.rest.x - node_width / 2, s.rest.y - node_width);
      line(s.rest.x - node_width / 2, s.rest.y - node_width / 2 - 15, s.rest.x - node_width / 2, s.rest.y - node_width);
      triangle(s.rest.x - node_width / 2 - 10, s.rest.y - node_width / 2 - 15, s.rest.x - node_width / 2, s.rest.y - node_width / 2 - 5, s.rest.x - node_width / 2 + 10, s.rest.y - node_width / 2 - 15);
    }
    else {
      line(s.x + node_width / 2, s.y, s.rest.x - node_width - 20, s.rest.y);
      triangle(s.rest.x - node_width - 20, s.y - 10, s.rest.x - node_width - 8, s.y, s.rest.x - node_width - 20, s.y + 10);
    }
    drawLink(s.rest, color);
  }
}

function drawRepr(s, phrase, color, first_only) {
  fill('black'); textSize(28); textAlign(LEFT);
  let sub_start_index = s.repr.indexOf(phrase); let sub_end_index = sub_start_index + phrase.length;
  let curr = 0; 
  let h_pos = 128; let v_pos = height * 0.15 + 3.7 * node_voffset; 
  text('s = ', 64, v_pos + 0.3 * node_voffset);
  while (curr < s.repr.length) {
    fill('black')
    if (curr % 84 == 0) { 
      v_pos += 0.3 * node_voffset; 
      h_pos = 128;
    }
    if (curr >= sub_start_index
       && curr < sub_end_index
       && !first_only) {
      fill(color)
    }
    else if (first_only
            && /^[0-9]$/.test(s.repr.charAt(curr))
            && curr >= sub_start_index + 5
            && curr < sub_start_index + 7) {
      fill(color)
    }
    text(s.repr.charAt(curr), h_pos, v_pos);
    curr += 1; h_pos += 14;
  }
  textAlign(CENTER); fill('black');
}

function indicator(s, sublink, first_only) {
  text('Currently highlighted: ', width / 2, 0.8 * height);
  let str = 's'; let ct = 0;
  fill(51);
  rect(width / 2, 0.8 * height + 90, 1100, 120);
  fill('black');
  while (s != sublink) {
    if (ct > 0 && ct % 11 == 0) {
      str += '\n';
    }
    str += '.rest';
    s = s.rest;
    ct += 1;
  }
  if (first_only) {
    str += '.first';
  }
  return str;
}

class Link {
  /*
  Based on CS61A implementation of Linked Lists.
  Includes additional methods/variables that help with graphical representation.
  */
  constructor(first, rest)
  {
    this.first = first;
    this.rest = rest;
    this.setRepr();
    this.setCoords(node_width * 2, height * 0.15);
  }

  setRepr()
  /*
  Sets the repr instance variable, which represents how one would declare
  a Linked List variable in Python.
  */
  {
    let curr = this;
    let repr = "";
    let parentheses = 0;
    
    while (curr) {
      repr += "Link(" + curr.first + ", "
      curr = curr.rest 
      parentheses += 1;
    }
    repr += "null" + ")".repeat(parentheses);
    this.repr = repr;
  }

  setCoords(x, y)
  { 
  /*
  Sets the coordinates of the two-square visual representation of each Link. 
  */
    if (y >= height * 0.15 + 4 * node_voffset) {
      throw "Linked List graphic will overlap with text";
    }
    let curr = this;
    curr.x = x;
    curr.y = y;
    if (curr.rest != null) {
      if (curr.rest.x >= width - 2 * node_hoffset) {
        curr.rest.setCoords(node_width * 2, y + node_voffset);
      }
      else {
        curr.rest.setCoords(x + (node_width * 2 + node_hoffset), y);
      }
    }
  }
}

function allSubLinks(s) {
  /*
  Return a list of all the Linked Lists within a Linked List s.
  */
 let lst = [];
 while (s) {
   lst.push(s);
   s = s.rest;
 }
 return lst;
}

function makeLinkedList(length) {
  temp = null;
  while (length > 0) {
    temp = new Link(length, temp);
    length -= 1;
  }
  return temp;
}

let test = makeLinkedList(32);
let sublinks = allSubLinks(test);