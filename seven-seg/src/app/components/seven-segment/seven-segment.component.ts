import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'seven-segment',
  templateUrl: './seven-segment.component.html',
  styleUrls: ['./seven-segment.component.scss']
})
export class SevenSegmentComponent implements AfterViewInit {

  @Input() width: number = 400
  @Input() height: number = 500
  @Input() backgroundColor: string = '#000000'
  @Input() colorOn: string = '#51ff00'
  @Input() colorOff: string = 'rgba(255, 255, 255, 0.1)'

  @ViewChild("canvas", { static: false }) canvas: ElementRef | undefined

  ngAfterViewInit () {
    this.drawSevenSegments()
  }

  drawSevenSegments () {
    if (this.canvas && this.canvas.nativeElement) {
      let ctx = this.canvas.nativeElement.getContext("2d");

      ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      let width = this.canvas.nativeElement.width
      let height = this.canvas.nativeElement.height

      let offset = 10

      ctx.strokeStyle = this.colorOn;
      ctx.lineWidth = 0.5;

      for ( let  i = 0; i < height; i += offset ) {

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();

      }

      for ( let  i = 0; i < width; i += offset ) {

        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();

      }

      const drawSegment = (
        startX: number,
        startY: number,
        length: number,
        width: number, 
        vertical: boolean = false,
        on: boolean = false
      ) => {

        let triangleHeight: number = parseInt(( width / 2 ).toString())

        ctx.fillStyle = on ? this.colorOn : this.colorOff

        if ( !vertical ) {
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX + triangleHeight, startY + width / 2);
          ctx.lineTo(startX + triangleHeight, startY - width / 2);
          ctx.fill();

          ctx.beginPath();
          ctx.rect(startX + triangleHeight, startY - width / 2, length - ( triangleHeight * 2 ), width);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(startX + length - triangleHeight, startY - width / 2);
          ctx.lineTo(startX + length, startY);
          ctx.lineTo(startX + length - triangleHeight, startY + width / 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX + width / 2 , startY + triangleHeight);
          ctx.lineTo(startX - width / 2 , startY + triangleHeight);
          ctx.fill();

          ctx.beginPath();
          ctx.rect(startX - width / 2, startY + triangleHeight, width, length - ( triangleHeight * 2 ));
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(startX - width / 2 ,  startY + length - triangleHeight );
          ctx.lineTo(startX             ,  startY + length );
          ctx.lineTo(startX + width / 2 ,  startY + length - triangleHeight );
          ctx.fill();
        }
      }

      const normalize = ( 
        x: number,
        rangeOriginMin: number,
        rangeOriginMax: number,
        rangeTargetMin: number,
        rangeTargetMax: number,
      ) => {
        return (( x - rangeOriginMin ) / ( rangeOriginMax - rangeOriginMin )) * ( rangeTargetMax - rangeTargetMin ) + rangeTargetMin
      }

      const normX = (
        x: number
      ) => {
        return normalize ( x, 0, 100, 0, width )
      }

      const normY = (
        y: number
      ) => {
        return normalize ( y, 0, 100, 0, height )
      }

      drawSegment (   normX(78),   normY(47),   normX(70),   normY(20),   false , true )      // A
      drawSegment (   normX(151),  normY(50),   normY(70),   normX(20),   true  , true )      // B
      drawSegment (   normX(151),  normY(126),  normY(70),   normX(20),   true  , true )      // C
      drawSegment (   normX(78),   normY(199),  normX(70),   normY(20),   false , true )      // D
      drawSegment (   normX(75),   normY(126),  normY(70),   normX(20),   true  , true )      // E
      drawSegment (   normX(75),   normY(50),   normY(70),   normX(20),   true  , true )      // F
      drawSegment (   normX(78),   normY(123),  normX(70),   normY(20),   false , true )      // G

    }
  }

}
