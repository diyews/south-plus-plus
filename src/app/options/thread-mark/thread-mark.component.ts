import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-thread-mark',
  templateUrl: './thread-mark.component.html',
  styleUrls: ['./thread-mark.component.less']
})
export class ThreadMarkComponent implements OnInit {
  formGroup = this.formBuilder.group({
    moveCommentViewCount1: [0, [Validators.required, Validators.min(1)], ],
    moveCommentViewCount2: [0, [Validators.required, Validators.min(1)], ],
  });

  constructor(private formBuilder: FormBuilder,
              private storageService: StorageService,
  ) {
    this.storageService.getConfig()
      .then(config => {
        this.formGroup.patchValue(config, { emitEvent: false });
      })
    this.formGroup.valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe(data => {
        if (this.formGroup.valid) {
          this.storageService.setConfig({ ...data });
        }
      })
  }

  ngOnInit(): void {
  }

}
