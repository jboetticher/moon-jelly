/*
 * Ocean Protocol D3 wave animation
 * Loosely based off of Bostock's Circle Wave
 * https://bl.ocks.org/mbostock/2d466ec3417722e3568cd83fc35338e3
 */

const svg = d3.select('svg'),
      width = 2000,
      height = +svg.attr('height'),
      x = d3.scaleLinear().range([0, width]);
      angles = d3.range(0, 4*Math.PI, Math.PI / 20);

const path = svg
  .append('g')
  .attr('transform', `translate(${width/48}, ${height/2})`)
  .attr('fill', 'none')
  .attr('stroke-width', 2)
  .selectAll('path')
  .data(['#FF4092','#E000CF','#8B98A9', '#E2E2E2'])
  .enter()
  .append('path')
  .attr('stroke', d => { return d })
  .style('mix-blend-mode', 'darken')
  .datum( (d, i) => {
    return d3
        .line()
        .curve(d3.curveBasisOpen)
        .x((angles) => {
          return x(angles / 4)
        })
        .y((angles) => {
          const t = d3.now() / 3000
          return (
            Math.cos(angles * 8 - (i * 2 * Math.PI) / 10 + t) *
            Math.pow((2 + Math.cos(angles - t)) / 2, 4) *
            15
          )
        })
  })

d3.timer( () => {
  path.attr('d', d => {
    return d(angles)
   })
})

let Waves = () => {
    return(
        <svg src={path} />
    );
}

export default Waves;