/** Shared LayerChart tooltip props for consistent theming */
export const LC_TOOLTIP_PROPS = {
	root: {
		class: 'z-[60]',
		classes: {
			container:
				'border border-border bg-card/95 text-foreground shadow-md backdrop-blur-sm rounded-lg'
		}
	},
	header: {
		classes: {
			root: 'border-border text-foreground font-semibold'
		}
	},
	item: {
		classes: {
			label: 'text-muted-foreground text-sm',
			value: 'text-foreground font-medium text-sm'
		}
	}
};

/** Shared LayerChart axis props */
export const LC_AXIS_PROPS = {
	tickLabelProps: {
		style: 'font-size: 12px;'
	},
	rule: {
		style: 'stroke: var(--color-border); stroke-opacity: 0.8;'
	},
	labelProps: {
		style: 'font-size: 12px; font-weight: 600;'
	}
};

/** Shared LayerChart grid config */
export const LC_GRID = {
	x: false,
	y: { style: ' stroke-opacity: 0.5;' }
};
