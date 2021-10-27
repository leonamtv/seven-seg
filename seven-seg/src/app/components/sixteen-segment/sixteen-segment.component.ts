import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'sixteen-segment',
  templateUrl: './sixteen-segment.component.html',
  styleUrls: ['./sixteen-segment.component.scss']
})
export class SixteenSegmentComponent implements AfterViewInit {

  @Input() width: number = 360
  @Input() height: number = 500

  @Input() randomNoise: boolean = false;

  private _bitMask: number = 5376
  @Input() set bitMask ( val: number ) {
    this._bitMask = val
    this.drawSixteenSegments()
  }
  get bitMask () {
    return this._bitMask
  }
  @Input() shadowColor: string = '#51ff00'
  @Input() shadowBlur: number = 15
  @Input() backgroundColor: string = '#000000'
  @Input() colorOn: string = '#51ff00'
  @Input() colorOff: string = 'rgba(255, 255, 255, 0.1)'

  @ViewChild("canvas", { static: false }) canvas: ElementRef | undefined

  ngAfterViewInit () {
    this.drawSixteenSegments()
  }

  normalize ( 
    x: number,
    rangeOriginMin: number, rangeOriginMax: number,
    rangeTargetMin: number, rangeTargetMax: number,
  ) {
    return (( x - rangeOriginMin ) / ( rangeOriginMax - rangeOriginMin )) * ( rangeTargetMax - rangeTargetMin ) + rangeTargetMin
  }

  normX ( x: number ) {
    return this.normalize ( x, 0, 106, 0, this.width )
  }

  normY ( y: number ) {
    return this.normalize ( y, 0, 102, 0, this.height )
  }


  drawCrossSegment (
    quadrant: 0 | 1 | 2 | 3, on: boolean = false
  ) {
    if (this.canvas && this.canvas.nativeElement) {

      let coordCrossSegment: any[] = [ { 
        coords: [
          { x : 22, y : 14 }, { x : 22, y : 24 }, { x : 39, y : 44 },
          { x : 43, y : 44 }, { x : 43, y : 35 }, { x : 26, y : 14 },
        ]}, { 
        coords: [
          { x : 80, y : 24 }, { x : 63, y : 44 }, { x : 59, y : 44 },
          { x : 59, y : 35 }, { x : 76, y : 14 }, { x : 80, y : 14 },
        ]}, { 
        coords: [
          { x : 59, y : 56 }, { x : 63, y : 56 }, { x : 80, y : 77 },
          { x : 80, y : 86 }, { x : 76, y : 86 }, { x : 59, y : 65 },
        ]}, { 
        coords: [
          { x : 43, y : 56 }, { x : 39, y : 56 }, { x : 22, y : 77 },
          { x : 22, y : 86 }, { x : 26, y : 86 }, { x : 43, y : 65 },
        ]},
      ]


      let ctx = this.canvas.nativeElement.getContext("2d");

      ctx.fillStyle = on ? this.colorOn : this.colorOff
      ctx.shadowColor = this.shadowColor;

      if ( on ) {
        ctx.shadowBlur = this.shadowBlur + ( this.randomNoise ? Math.floor( Math.random() * 5 ) : 0 );
      } else {
        ctx.shadowBlur = 0;
      } 

      let coord = coordCrossSegment[quadrant].coords

      ctx.beginPath();
      ctx.moveTo(this.normX(coord[0].x), this.normY(coord[0].y));
      ctx.lineTo(this.normX(coord[1].x), this.normY(coord[1].y));
      ctx.lineTo(this.normX(coord[2].x), this.normY(coord[2].y));
      ctx.lineTo(this.normX(coord[3].x), this.normY(coord[3].y));
      ctx.lineTo(this.normX(coord[4].x), this.normY(coord[4].y));
      ctx.lineTo(this.normX(coord[5].x), this.normY(coord[5].y));
      ctx.fill();

    }
  }

  drawDot ( on: boolean = false ) {
    if (this.canvas && this.canvas.nativeElement) {
      let ctx = this.canvas.nativeElement.getContext("2d");

      ctx.fillStyle = on ? this.colorOn : this.colorOff
      ctx.shadowColor = this.shadowColor;

      if ( on ) {
        ctx.shadowBlur = this.shadowBlur + ( this.randomNoise ? Math.floor( Math.random() * 5 ) : 0 );
      } else {
        ctx.shadowBlur = 0;
      } 

      let outerInnerCircle = new Path2D();
      outerInnerCircle.arc(this.normX(97), this.normY(93), this.normY(4), 0, 2 * Math.PI);
      ctx.lineWidth = 1;
      ctx.fill(outerInnerCircle);
    }
  }

  drawOuterSegment (
    startX: number, startY: number, length: number, 
    width: number,  vertical: boolean = false, on: boolean = false
  ) {
    
    if (this.canvas && this.canvas.nativeElement) {
      let ctx = this.canvas.nativeElement.getContext("2d");

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
  }

  drawOuterSegments ( bits: any, index : '1' | '2' | '4' | '5' | '6' | '8' | '9' | '17' | '15' | '14' | '10' | '12' = '1' ) {
    let coordOuterSegments = {
      '1' : { x : 15, y : 8,  l : 35, w : 10, v : false },
      '2' : { x : 51, y : 9,  l : 40, w : 13, v : true  },
      '4' : { x : 14, y : 9,  l : 40, w : 13, v : true  },
      '5' : { x : 15, y : 50, l : 35, w : 10, v : false },
      '6' : { x : 51, y : 51, l : 40, w : 13, v : true  },
      '8' : { x : 14, y : 51, l : 40, w : 13, v : true  },
      '9' : { x : 15, y : 92, l : 35, w : 10, v : false },
      '10': { x : 52, y : 92, l : 35, w : 10, v : false },
      '12': { x : 88, y : 51, l : 40, w : 13, v : true  },
      '14': { x : 52, y : 50, l : 35, w : 10, v : false },
      '15': { x : 88, y : 9,  l : 40, w : 13, v : true  },
      '17': { x : 52, y : 8,  l : 35, w : 10, v : false },
    }

    let coord = coordOuterSegments[index]
    this.drawOuterSegment ( 
      this.normX(coord.x), 
      this.normY(coord.y), 
      ( coord.v ) ? this.normY(coord.l) : this.normX(coord.l), 
      ( coord.v ) ? this.normX(coord.w) : this.normY(coord.w), 
      coord.v, 
      bits[index]
    )
  }

  drawSixteenSegments () {

    if (this.canvas && this.canvas.nativeElement) {
      let ctx = this.canvas.nativeElement.getContext("2d");
      let currentBoolIndex: number = this._bitMask
      let bits: any = {}
      
      for ( let i = 17; i >= 0; i-- ) {
        let on: boolean = ( currentBoolIndex & 1 ) == 1 
        bits[i.toString()] = on 
        currentBoolIndex = currentBoolIndex >> 1
      }
      
      ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      type outer = '1' | '2' | '4' | '5' | '6' | '8' | '9' | '17' | '15' | '14' | '10' | '12'

      let outerSegments: outer[] = [ '1', '2', '4', '5', '6', '8', '9', '17', '15', '14', '10', '12']

      outerSegments.forEach ( index =>{
        this.drawOuterSegments ( bits, index )
      })
      this.drawCrossSegment  ( 0, bits['3'] )
      this.drawCrossSegment  ( 1, bits['16'] )
      this.drawCrossSegment  ( 2, bits['13'] )
      this.drawCrossSegment  ( 3, bits['7'] )
      this.drawDot           ( bits['11'] )

    }
  }

}
