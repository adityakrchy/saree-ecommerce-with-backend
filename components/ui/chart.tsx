"use client"

import * as React from "react"
import {
  Bar as BarPrimitive,
  BarChart as BarChartPrimitive,
  CartesianGrid as CartesianGridPrimitive,
  Legend as LegendPrimitive,
  Line as LinePrimitive,
  LineChart as LineChartPrimitive,
  Pie as PiePrimitive,
  PieChart as PieChartPrimitive,
  ResponsiveContainer as ResponsiveContainerPrimitive,
  Tooltip as TooltipPrimitive,
  XAxis as XAxisPrimitive,
  YAxis as YAxisPrimitive,
} from "recharts"

import { cn } from "@/lib/utils"

const ResponsiveContainer = React.forwardRef<
  React.ElementRef<typeof ResponsiveContainerPrimitive>,
  React.ComponentPropsWithoutRef<typeof ResponsiveContainerPrimitive>
>(({ className, ...props }, ref) => (
  <div className="w-full h-full">
    <ResponsiveContainerPrimitive className={cn("", className)} {...props} ref={ref} />
  </div>
))
ResponsiveContainer.displayName = "ResponsiveContainer"

const BarChart = React.forwardRef<
  React.ElementRef<typeof BarChartPrimitive>,
  React.ComponentPropsWithoutRef<typeof BarChartPrimitive>
>(({ className, children, ...props }, ref) => (
  <BarChartPrimitive className={cn("", className)} {...props} ref={ref}>
    {children}
  </BarChartPrimitive>
))
BarChart.displayName = "BarChart"

const LineChart = React.forwardRef<
  React.ElementRef<typeof LineChartPrimitive>,
  React.ComponentPropsWithoutRef<typeof LineChartPrimitive>
>(({ className, children, ...props }, ref) => (
  <LineChartPrimitive className={cn("", className)} {...props} ref={ref}>
    {children}
  </LineChartPrimitive>
))
LineChart.displayName = "LineChart"

const PieChart = React.forwardRef<
  React.ElementRef<typeof PieChartPrimitive>,
  React.ComponentPropsWithoutRef<typeof PieChartPrimitive>
>(({ className, children, ...props }, ref) => (
  <PieChartPrimitive className={cn("", className)} {...props} ref={ref}>
    {children}
  </PieChartPrimitive>
))
PieChart.displayName = "PieChart"

const Pie = React.forwardRef<
  React.ElementRef<typeof PiePrimitive>,
  React.ComponentPropsWithoutRef<typeof PiePrimitive>
>(({ className, ...props }, ref) => <PiePrimitive className={cn("", className)} {...props} ref={ref} />)
Pie.displayName = "Pie"

const Bar = React.forwardRef<
  React.ElementRef<typeof BarPrimitive>,
  React.ComponentPropsWithoutRef<typeof BarPrimitive>
>(({ className, ...props }, ref) => <BarPrimitive className={cn("", className)} {...props} ref={ref} />)
Bar.displayName = "Bar"

const Line = React.forwardRef<
  React.ElementRef<typeof LinePrimitive>,
  React.ComponentPropsWithoutRef<typeof LinePrimitive>
>(({ className, ...props }, ref) => <LinePrimitive className={cn("", className)} {...props} ref={ref} />)
Line.displayName = "Line"

const XAxis = React.forwardRef<
  React.ElementRef<typeof XAxisPrimitive>,
  React.ComponentPropsWithoutRef<typeof XAxisPrimitive>
>(({ className, ...props }, ref) => <XAxisPrimitive className={cn("", className)} {...props} ref={ref} />)
XAxis.displayName = "XAxis"

const YAxis = React.forwardRef<
  React.ElementRef<typeof YAxisPrimitive>,
  React.ComponentPropsWithoutRef<typeof YAxisPrimitive>
>(({ className, ...props }, ref) => <YAxisPrimitive className={cn("", className)} {...props} ref={ref} />)
YAxis.displayName = "YAxis"

const CartesianGrid = React.forwardRef<
  React.ElementRef<typeof CartesianGridPrimitive>,
  React.ComponentPropsWithoutRef<typeof CartesianGridPrimitive>
>(({ className, ...props }, ref) => <CartesianGridPrimitive className={cn("", className)} {...props} ref={ref} />)
CartesianGrid.displayName = "CartesianGrid"

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive>
>(({ className, ...props }, ref) => <TooltipPrimitive className={cn("", className)} {...props} ref={ref} />)
Tooltip.displayName = "Tooltip"

const Legend = React.forwardRef<
  React.ElementRef<typeof LegendPrimitive>,
  React.ComponentPropsWithoutRef<typeof LegendPrimitive>
>(({ className, ...props }, ref) => <LegendPrimitive className={cn("", className)} {...props} ref={ref} />)
Legend.displayName = "Legend"

export {
  ResponsiveContainer,
  BarChart,
  LineChart,
  PieChart,
  Pie,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
}

