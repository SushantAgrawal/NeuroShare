import { CanvasDimension, XDomain, RootGraphContainerState } from '../model/shared.model';
import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

export class RootGraphContainerHelper {

    // Component state related.
    public getXDomain(minDate: Date, maxDate: Date): XDomain {
        let xDomain = new XDomain();
        xDomain.defaultMinValue = minDate;
        xDomain.defaultMaxValue = maxDate;
        xDomain.currentMinValue = minDate;
        xDomain.currentMaxValue = maxDate;
        return xDomain;
    };

    public getCanvasDimension(rootGraphContainer: ElementRef): CanvasDimension {
        let margin = {
            top: 5,
            right: 25,
            bottom: 20,
            left: 25
        };
        let element = rootGraphContainer.nativeElement;
        let dimension = new CanvasDimension();
        dimension.offsetHeight = element.offsetHeight;
        dimension.offsetWidth = element.offsetWidth;
        dimension.height = element.offsetHeight - margin.top - margin.bottom;
        dimension.width = element.offsetWidth - margin.left - margin.right;
        dimension.marginTop = margin.top;
        dimension.marginRight = margin.right;
        dimension.marginBottom = margin.bottom;
        dimension.marginLeft = margin.left;
        return dimension;
    };

    public getXScale(dimension: CanvasDimension, xDomain: XDomain): any {
        return d3.scaleTime()
            .domain([xDomain.currentMinValue, xDomain.currentMaxValue])
            .range([0, dimension.width])
    }

    public getDefaultState(rootGraphContainer: ElementRef): RootGraphContainerState {
        let state = new RootGraphContainerState();
        state.canvasDimension = this.getCanvasDimension(rootGraphContainer);
        state.xDomain = this.getXDomain(new Date(2013, 7, 1), new Date(2017, 11, 31));
        state.xScale = this.getXScale(state.canvasDimension, state.xDomain);
        return state;
    };


    // D3 drawing related.
    public drawRootElement(rootGraphContainer: ElementRef, state: RootGraphContainerState): void {
        let rootCanvasElement = d3.select('#root-canvas');
        let sharedChartGridElement = d3.select('#shared-chart-grid');

        this.setupRootCanvas(rootCanvasElement, state.canvasDimension);
        let sharedChartGrid = this.setupSharedChartGrid(sharedChartGridElement, state.canvasDimension);
        this.drawScrollArrows(sharedChartGridElement, state.canvasDimension);
        this.drawVerticalGridLines(sharedChartGrid, state.canvasDimension, state.xScale);
        this.drawCommonXAxis(sharedChartGrid, state.canvasDimension, state.xScale);
    };

    public setupRootCanvas(nodeSelection: any, dimension: CanvasDimension): any {
        return nodeSelection
            .attr('width', dimension.offsetWidth)
            .attr('height', dimension.offsetHeight);
    };

    public setupSharedChartGrid(nodeSelection: any, dimension: CanvasDimension): any {
        return nodeSelection
            .attr('width', dimension.offsetWidth)
            .attr('height', dimension.offsetHeight)
            .append('g')
            .attr('transform', `translate(${dimension.marginLeft},${dimension.marginTop})`);
    };

    public drawScrollArrows(nodeSelection: any, dimension: CanvasDimension): void {
        let arc = d3.symbol().type(d3.symbolTriangle).size(100);
        let hAdj = 7;
        let vAdj = 8;
        nodeSelection.append('path')
            .attr('d', arc)
            .attr('class', 'x-axis-arrow')
            .attr('transform', `translate(${dimension.marginLeft - hAdj}, ${dimension.marginTop + vAdj}) rotate(270)`)
            .on('click', d => { });

        nodeSelection.append('path')
            .attr('d', arc)
            .attr('class', 'x-axis-arrow')
            .attr('transform', `translate(${dimension.marginLeft + dimension.width + hAdj}, ${dimension.marginTop + vAdj}) rotate(90)`)
            .on('click', d => { });
    };

    public drawCommonXAxis(nodeSelection: any, dimension: CanvasDimension, xScale: any): void {
        nodeSelection.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', dimension.width)
            .attr('height', 16)
            .attr('class', 'custom-x-domain');

        let xAxisMajor = d3.axisBottom(xScale).ticks(d3.timeYear).tickSize(2);
        let xAxisMinor = d3.axisBottom(xScale).ticks(d3.timeMonth).tickSize(2);

        nodeSelection.append('g').call(g => {
            g.call(xAxisMajor);
            g.select('.domain').remove();
        });

        nodeSelection.append('g')
            .attr('class', 'x-axis')
            .call(g => {
                g.call(xAxisMinor);
                g.call(xAxisMinor).selectAll('text').remove();
                g.select('.domain').remove();
            });

    };

    public drawVerticalGridLines(nodeSelection: any, dimension: CanvasDimension, xScale: any): void {
        let gridlines = d3.axisBottom(xScale)
            .ticks(d3.timeMonth)
            .tickFormat(null)
            .tickSize(dimension.offsetHeight);
        nodeSelection.append('g')
            .attr('class', 'grid-lines')
            .call(g => {
                g.call(gridlines).selectAll('text').remove();
                g.select('.domain').remove();
            });
    };
}