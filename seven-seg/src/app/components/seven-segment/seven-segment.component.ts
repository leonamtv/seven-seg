import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'seven-segment',
  templateUrl: './seven-segment.component.html',
  styleUrls: ['./seven-segment.component.scss']
})
export class SevenSegmentComponent implements AfterViewInit {

  @Input() width: number = 360
  @Input() height: number = 500

  @Input() randomNoise: boolean = false;

  private _bitMask: number = 0b0000000
  @Input() set bitMask ( val: number ) {
    this._bitMask = val
    this.drawSevenSegments()
  }
  get bitMask () {
    return this._bitMask
  }
  @Input() shadowColor: string = '#51ff00'
  @Input() shadowBlur: number = 10
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
        ctx.shadowColor = this.shadowColor;

        if ( on ) {
          ctx.shadowBlur = this.shadowBlur + ( this.randomNoise ? Math.floor( Math.random() * 5 ) : 0 );
        } else {
          ctx.shadowBlur = 0;
        } 

        if ( !vertical ) {
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX + triangleHeight, startY + width / 2);
          ctx.lineTo(startX + length - triangleHeight, startY + width / 2);
          ctx.lineTo(startX + length, startY);
          ctx.lineTo(startX + length - triangleHeight, startY - width / 2);
          ctx.lineTo(startX + triangleHeight, startY - width / 2);
          ctx.fill();

        } else {
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX + width / 2 , startY + triangleHeight);
          ctx.lineTo(startX + width / 2 ,  startY + length - triangleHeight );
          ctx.lineTo(startX             ,  startY + length );
          ctx.lineTo(startX - width / 2 ,  startY + length - triangleHeight );
          ctx.lineTo(startX - width / 2 , startY + triangleHeight);
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

      let coordSegments = [
        { x : 15, y : 50, l : 70, w : 10, v : false }, // G
        { x : 14, y : 9,  l : 40, w : 13, v : true  }, // F
        { x : 14, y : 51, l : 40, w : 13, v : true  }, // E
        { x : 15, y : 92, l : 70, w : 10, v : false }, // D
        { x : 86, y : 51, l : 40, w : 13, v : true  }, // C
        { x : 86, y : 9,  l : 40, w : 13, v : true  }, // B
        { x : 15, y : 8,  l : 70, w : 10, v : false }, // A
      ]
      
      let currentBoolIndex: number = this._bitMask
      coordSegments.forEach (( coord ) => {
        let on: boolean = ( currentBoolIndex & 1 ) == 1 
        drawSegment ( 
          normX(coord.x), 
          normY(coord.y), 
          ( coord.v ) ? normY(coord.l) : normX(coord.l), 
          ( coord.v ) ? normX(coord.w) : normY(coord.w), 
          coord.v, 
          on
        )
        currentBoolIndex = currentBoolIndex >> 1
      }) 

    }
  }

}
